''' This file will handle database functionality '''

import os
import pymongo
from auctionhouse.logging.logger import get_logger
from auctionhouse.models.auctions import Product, Auction, Bid
from auctionhouse.models.users import Bidder, Employee

_log = get_logger(__name__)

''' Ensure taht your MONGO_URI environment variable is set to your mongo connection URI. '''
MONGO_URI = os.getenv('MONGO_URI')

# Initialize mongo conection
mongo = pymongo.MongoClient(MONGO_URI) # Open the database connection

# Database and collection names
db = mongo.projecttwo
util = db['utilities']
auctions = db['auctions']
users = db['users']
products = db["products"]

# Creation Operations
def create_bidder(new_bidder: Bidder):
    ''' Create a Bidder in the database '''
    new_bidder.set_id(_get_user_id_counter())
    try:
        users.insert_one(new_bidder.to_dict())
        op_success = new_bidder
    except pymongo.errors.DuplicateKeyError as err:
        _log.error(err)
        op_success = None
    _log.info('Added %s', new_bidder.get_username)
    return op_success

def create_employee(new_emp: Employee):
    '''Create an Employee in the database'''
    new_emp.set_id(_get_user_id_counter())
    try:
        users.insert_one(new_emp.to_dict())
        op_success = new_emp
    except pymongo.errors.DuplicateKeyError as err:
        _log.error(err)
        op_success = None
    _log.info('Added %s named %s', new_emp.get_role, new_emp.get_username)
    return op_success

def create_product(new_product: Product):
    '''Create a Product in the database'''
    new_product.set_id(_get_product_id_counter())
    try:
        products.insert_one(new_product.to_dict())
        op_success = new_product
    except pymongo.errors.DuplicateKeyError as err:
        _log.error(err)
        op_success = None
    _log.info('Added %s product. ID: %s.', new_product.get_name(), new_product.get_id())
    return op_success

def create_auction(new_auction: Auction):
    '''Create an Auction in the database'''
    new_auction.set_id(_get_auction_id_counter())
    try:
        auctions.insert_one(new_auction.to_dict())
        op_success = new_auction
    except pymongo.errors.DuplicateKeyError as err:
        _log.error(err)
        op_success = None
    _log.info('Added auction %s', new_auction.get_id())
    return op_success
      
def create_bid(new_bid: Bid, auction_id):
    ''' Create a Bid in the database '''
    new_bid.set_id(_get_auction_id_counter())
    query_string = {'_id': auction_id}
    try:
        auctions.update_one(query_string, { '$push': {'bids': new_bid.to_dict()}})
        op_success = new_bid
    except pymongo.errors.DuplicateKeyError as err:
        _log.error(err)
        op_success = None
    _log.info('Added Bid. ID: %s.', new_bid.get_id())
    return op_success

# Read operations
def read_all_users():
    ''' Retrieve all users '''
    return users.find({})

def read_all_bidders():
    ''' Retrieve all bidders '''
    return users.find({'history': {'$exists': True}})

def read_all_employees():
    ''' Retrieve all employees '''
    return users.find({'role': {'$exists': True}})

def read_user_by_id(user_id: int):
    ''' Retrieve a User by their id in the database '''
    query_string = {'_id': user_id}
    return users.find_one(query_string)

def read_user_by_username(username: str):
    ''' Retrieve a user by their username '''
    query_string = {'username': username }
    return users.find_one(query_string)

def read_product_by_id(product_id: int):
    ''' Retrieve a product by ID '''
    query_string = {"_id": product_id}
    return products.find_one(query_string)

def read_all_products():
    ''' Retrieve all products '''
    return products.find({})

def read_auction_by_id(auction_id: int):
    ''' Retireve an auction or bid by id '''
    query_string = {"_id": auction_id}
    return products.find_one(query_string)

def read_all_auctions():
    ''' Retrieves all auctions '''
    return auctions.find({})

#Update Functions

#Delete Functions

# ID Counter Functions
def _get_user_id_counter():
    '''This function will get a unique ID by pulling it from the counter field of a counter
    document, then increase the counter value.'''
    return util.find_one_and_update({'_id': 'USERID_COUNTER'},
                                    {'$inc': {'count': 1}},
                                    return_document=pymongo.ReturnDocument.AFTER)['count']
def _get_auction_id_counter():
    '''This function will get a unique ID by pulling it from the counter field of a counter
    document, then increase the counter value.'''
    return util.find_one_and_update({'_id': 'AUCTIONID_COUNTER'},
                                    {'$inc': {'count': 1}},
                                    return_document=pymongo.ReturnDocument.AFTER)['count']

def _get_product_id_counter():
    '''This function will get a unique ID by pulling it from the counter field of a counter
    document, then increase the counter value.'''
    return util.find_one_and_update({'_id': 'PRODUCTID_COUNTER'},
                                    {'$inc': {'count': 1}},
                                    return_document=pymongo.ReturnDocument.AFTER)['count']


if __name__ == "__main__":
    ''' This is the database initialization functionality '''
    util.drop()
    products.drop()
    users.drop()
    auctions.drop()

    util.insert_one({'_id': 'USERID_COUNTER', 'count': 0})
    util.insert_one({'_id': 'AUCTIONID_COUNTER', 'count': 0})
    util.insert_one({'_id': 'PRODUCTID_COUNTER', 'count': 0})

    users.create_index('username', unique=True)

    # Bidder
    bidder = Bidder('bidder', 'password')
    bidder = create_bidder(bidder)
    # manager
    manager = Employee('manager', 'password', 'Manager')
    create_employee(manager)
    # curator
    curator = Employee('curator', 'password', 'Curator')
    create_employee(curator)
    # auctioneer
    auctioneer = Employee('auctioneer', 'password', 'Auctioneer')
    create_employee(auctioneer)

    # product
    product = Product('Product1', 'Much expensive. Very product.', 10)
    create_product(product)
    # Bid
    bid = Bid(bidder.get_id(), product.get_id(), 100)
    # auction
    auction = Auction(product.get_id())
    create_auction(auction)
    create_bid(bid, auction.get_id())
    
