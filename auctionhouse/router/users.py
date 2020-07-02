''' This is the Users router. It will handle HTTP requests for Users. '''

''' This is the Users router. It will handle HTTP requests for Users. '''

from flask import Flask, request, make_response, jsonify, render_template, Blueprint
from flask_cors import CORS
from auctionhouse.models.users import User
import werkzeug
from auctionhouse.logging.logger import get_logger
users = Blueprint('users', __name__)

import auctionhouse.data.db as db
_log = get_logger(__name__)


@users.route('/users', methods=['GET', 'POST', 'DELETE'])
def login():
    if request.method == 'POST':
        # getting the user information from the form and getting the information from the db
        _log.debug(request.form)
        user = db.login(request.form['user'])
        if user:
            # Generate our token
            auth_token = user.encode_auth_token()
            _log.debug(dir(auth_token))
            response = make_response(jsonify(user))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        return {}, 401
    elif request.method == 'GET':
        auth_token = request.cookies.get('authorization')
        if auth_token:
            _log.debug(auth_token)
            _log.debug(User.decode_auth_token(auth_token))
            return jsonify(db.read_user_by_username(User.decode_auth_token(auth_token))), 200
        else:
            return {}, 401
    else:
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204