''' This is the Auctions router. It will handle HTTP requests for Auctions. '''

from flask import Flask, Blueprint, jsonify, request, make_response
from auctionhouse.data.db import create_bid
from auctionhouse.models.auctions import Bid

from auctionhouse.logging.logger import get_logger

_log = get_logger(__name__)

auctions = Blueprint('auctions', __name__)

@auctions.route('/auctions', methods=['GET', 'POST'])
def auctions_main():
    ''' This is the main /auctions route '''
    if request.method == 'POST':
        pass
    else:
        pass

@auctions.route('/auctions/<auction_id>',  methods=['GET', 'POST'])
def auctions_with_id(auction_id):
    ''' This is for requests associated with an Auction ID '''
    if request.method == 'POST': 
        # POST Request body should countain...
        # ID Of the bidder
        # ID of the item being bid on
        # Amount of the bid
        required_fields = ['bidder_id', 'item_id', 'amount']
        input_dict = request.get_json(force=True)
        _log.info('POST request recieved with body %s', input_dict)
        try:
            query_id = int(auction_id)
        except TypeError as err:
            input_dict = {}
        if all(field in input_dict for field in required_fields):
            new_bidder_id = input_dict['bidder_id']
            new_item_id = input_dict['item_id']
            new_amount = input_dict['amount']
            new_bid = Bid(new_bidder_id, new_item_id, new_amount)
            create_bid(new_bid, query_id)
            response = make_response(jsonify(new_bid.to_dict()), 201)
        else:
            response = make_response(request.json, 400)
            return response
    else:
        pass
