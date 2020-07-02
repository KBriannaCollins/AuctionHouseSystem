''' This is the Auctions router. It will handle HTTP requests for Auctions. '''

from flask import Flask, Blueprint, jsonify

auctions = Blueprint('auctions', __name__)

@auctions.route('/auctions', methods=['GET'])
def auctions_main():
    ''' This is the main /auctions route '''

    #TODO: Actually return jsonified auctions
    return None