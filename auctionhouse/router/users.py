''' This is the Users router. It will handle HTTP requests for Users. '''

from flask import Flask, Blueprint, jsonify

users = Blueprint('users', __name__)

@users.route('/users', methods=['GET'])
def users_main():
    ''' This is the main /users route '''

    #TODO: Actually return jsonified users
    return None