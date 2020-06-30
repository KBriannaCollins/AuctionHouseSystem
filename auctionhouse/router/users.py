''' This is the Users router. It will handle HTTP requests for Users. '''

from flask import Flask, Blueprint, jsonify, request

users = Blueprint('users', __name__)

@users.route('/users', methods=['GET'])
def users_main():
    ''' This is the main /users route '''

    #TODO: Actually return jsonified users
    pass

@users.route('/users/<username>', methods=['GET', 'POST'])
def users_by_username(username):
    ''' This is the /users route that handles requests with the username variable '''
    if request.method == 'POST':
        pass
    else:
        pass