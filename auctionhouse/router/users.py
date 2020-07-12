'''This is the Users router. It will handle HTTP requests for Users.'''

from flask import request, make_response, jsonify, Blueprint
from auctionhouse.models.users import User, Bidder, Employee
from auctionhouse.logging.logger import get_logger
from auctionhouse.data.db import login, read_user_by_username, create_bidder, create_employee, \
                                 read_all_users, delete_user, read_product_info_by_user_history

users = Blueprint('users', __name__)

_log = get_logger(__name__)


@users.route('/users', methods=['GET', 'POST', 'DELETE'])
def route_login():
    '''This is the route for login.'''
    if request.method == 'POST':
        # getting the user information from the form and getting the information from the db
        input_dict = request.get_json(force=True)
        user_username = input_dict['user']
        user_password = input_dict['password']
        user = login(user_username, user_password)
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
    elif request.method == 'DELETE':
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204
    else:
        return '', 501

@users.route('/register', methods=['GET', 'POST'])
def create_user():
    '''This is user route for registration.'''
    _log.debug('Creating bidder')
    required_fields = ['username', 'password']
    if request.method == 'POST':
        input_dict = request.get_json(force=True)
        _log.debug('User POST request received with body %s', input_dict)
        if all(field in input_dict for field in required_fields):
            username = input_dict['username']
            password = input_dict['password']
            new_bidder = Bidder(username, password)
            if create_bidder(new_bidder):
                return jsonify(new_bidder.to_dict()), 201
            else:
                return request.json, 400
        else:
            return request.json, 400
    else:
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204

@users.route('/userslist', methods=['GET', 'DELETE'])
def route_users():
    '''This is the user route for retrieving and deleting from the user collection.'''
    if request.method == 'GET':
        return_users = read_all_users()
        return {'userList': return_users}, 200
    elif request.method == 'DELETE':
        del_dict = request.get_json(force=True)
        if '_id' in del_dict:
            result = delete_user(del_dict['_id'])
            if result not in [None, 'Cannot delete a manager.']:
                return request.json, 200
        return {}, 400
    else:
        return {}, 400

@users.route('/users/history', methods = ['GET'])
def route_user_history():
    _log.debug('Here is the /users/history')
    if request.method == 'GET':
        _log.info('GET request for product info of bidder history')
        input_dict = request.args
        _log.debug(input_dict['_id'])
        if '_id' in input_dict:
            result = read_product_info_by_user_history(input_dict['_id'])
            _log.debug(result)
            return jsonify(result), 200
        else:
            return {}, 404
    else:
        return {}, 400


@users.route('/employee', methods=['GET','POST'])
def create_new_employee():
    '''This is the route for creating a new employee.'''
    _log.debug('Creating employee')
    required_fields = ['username', 'password', 'role']
    if request.method == 'POST':
        input_dict = request.get_json(force=True)
        _log.debug('User POST request received with body %s', input_dict)
        if all(field in input_dict for field in required_fields):
            username = input_dict['username']
            password = input_dict['password']
            role = input_dict['role']
            new_employee = Employee(username, password, role)
            if create_employee(new_employee):
                return jsonify(new_employee.to_dict()), 201
            else:
                return request.json, 400
        else:
            return request.json, 400
    else:
        empty = make_response({})
        empty.set_cookie('authorization', '')
        return empty, 204

