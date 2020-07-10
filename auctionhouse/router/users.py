''' This is the Users router. It will handle HTTP requests for Users. '''
from flask import Flask, request, make_response, jsonify, render_template, Blueprint
from flask_cors import CORS
from auctionhouse.models.users import User, Bidder
import werkzeug
from auctionhouse.logging.logger import get_logger
from auctionhouse.data.db import login, read_user_by_username, create_bidder

users = Blueprint('users', __name__)

_log = get_logger(__name__)


@users.route('/users', methods=['GET', 'POST', 'DELETE'])
def route_login():
    if request.method == 'POST':
        # getting the user information from the form and getting the information from the db
        _log.debug(request.form['user'])
        user_username = request.form['user']
        user = login(user_username)
        if user:
            # Generate our token
            auth_token = user.encode_auth_token()
            _log.debug(dir(auth_token))
            response = make_response(jsonify(user.to_dict()))
            response.set_cookie('authorization', auth_token.decode())
            return response, 200
        else:
            return {}, 401
    elif request.method == 'GET':
        auth_token = request.cookies.get('authorization')
        if auth_token:
            _log.debug(auth_token)
            _log.debug(User.decode_auth_token(auth_token))
            return jsonify(read_user_by_username(User.decode_auth_token(auth_token))), 200
        else:
            return {}, 401
    else:
        pass

@users.route('/register', methods=['GET','POST'])
def create_user():
    required_fields = ['username', 'password']
    if request.method == 'POST':
        input_dict = request.get_json(force=True)
        _log.debug('User POST request received with body %s', input_dict)
        if all(field in input_dict for field in required_fields):
            username = input_dict['username']
            password = input_dict['password']
            newBidder = Bidder(username, password)
            if create_bidder(newBidder):
                return jsonify(newBidder.to_dict()), 201
            else:
                return request.json, 400
        else:
            return request.json, 400
    else:
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204

@users.route('/users/<int:user_id>', methods=['GET','PUT'])
def get_user(user_id):
    if request.method == 'GET':
        _log.debug('GET request for users by ID')
        user = db.read_user_by_id(user_id)
        if user:
            return jsonify(db.read_user_by_id(user_id)), 200
    elif request.method == 'PUT':
        input_dict = request.get_json(force=True)
        if db.update_user_username(input_dict['_id'], input_dict['username'], inputdict['password']):
            return request.json, 204
        else:
            return request.json, 400
    else:
        pass




