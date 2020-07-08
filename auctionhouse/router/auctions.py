''' This is the Auctions router. It will handle HTTP requests for Auctions. '''

from flask import Flask, Blueprint, jsonify, request, make_response
from auctionhouse.data.db import create_bid, create_auction, auction_start, read_auctions_from_query
from auctionhouse.models.auctions import Bid, Auction


from auctionhouse.logging.logger import get_logger

_log = get_logger(__name__)

auctions = Blueprint('auctions', __name__)

@auctions.route('/auctions', methods=['GET', 'POST'])
def auctions_main():
    ''' This is the main /auctions route '''
    if request.method == 'POST':
        # POST request body should contain...
        # ID of the item (item_id)
        input_dict = request.get_json(force=True)
        _log.debug(input_dict)
        if 'item_id' in input_dict:
            new_auction = Auction(input_dict['item_id'])
            if create_auction(new_auction):
                return jsonify(new_auction.to_dict()), 201
            else:
                return request.json, 400
        else:
            return request.json, 400
    elif request.method == 'GET':
        # The GET request will either return all auctions or return them based on query info
        if len(request.args) == 0:
            return {'auctions': read_auctions_from_query({})}, 200
        else:
            query_dict = dict(request.args)
            for query in query_dict:
                try:
                    query_dict[query] = int(query_dict[query])
                except ValueError as err:
                    _log.error('Could not cast value to int, moving on...')
            _log.debug(query_dict)
            return_auctions = read_auctions_from_query(query_dict)
            return {'auctions': return_auctions}, 200
    else:
        return 'Not implemented', 501

@auctions.route('/auctions/<auction_id>',  methods=['GET', 'POST', 'PUT'])
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
            # response = make_response()
            return jsonify(new_bid.to_dict()), 201
        else:
            # response = make_response()
            return request.json, 400
    elif request.method == 'PUT':
        input_dict = request.get_json(force=True)
        _log.debug(input_dict)
        target_auction = int(auction_id)
        if 'numOfDays' in input_dict:
            updated_auction = auction_start(target_auction, input_dict['numOfDays'])
            return updated_auction, 200
        elif 'bidder_id' in input_dict:
            pass # Call db function
            return 'Nothing to say', 204
        else:
            return 'Invalid Request', 400
    else:
        pass
