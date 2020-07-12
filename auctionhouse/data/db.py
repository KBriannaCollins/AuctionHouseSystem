'''This file will handle database functionality'''

import os
import datetime
import pymongo
from auctionhouse.logging.logger import get_logger
from auctionhouse.models.auctions import Product, Auction, Bid
from auctionhouse.models.users import Bidder, Employee

_log = get_logger(__name__)

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
    '''Create a Bidder in the database'''
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
    '''Create a Bid in the database'''
    query_string = {'_id': auction_id}
    auct = Auction.from_dict(read_auction_by_id(auction_id))
    prod = read_product_by_id(auct.get_item_id())
    if new_bid['amount'] >= prod.get_start_bid():
        bid_list = auct.get_bids()
        if any(d['bidder_id'] == new_bid.get_bidder_id() for d in bid_list):
            for bid in bid_list:
                if bid['bidder_id'] == new_bid.get_bidder_id():
                    ind = bid_list.index(bid)
                    bid_list[ind] = new_bid.to_dict()
        else:
            bid_list.append(new_bid.to_dict())
        try:
            auctions.update_one(query_string, {'$set': {'bids': bid_list}})
            op_success = new_bid
            _log.info('Added new bid to auction %s', auction_id)
        except:
            op_success = None
        _log.info('Could not add new bid to auction %s', auction_id)
    else:
        op_success = None
        _log.info('Could not add new bid to auction %s', auction_id)
    return op_success

def update_product_status(product_id: int, status: str):
    '''Takes in a product and changes the status while optionally creating an auction'''
    _log.debug('Product Id %s', product_id)
    _log.debug('status string %s', status)
    product_id = int(product_id)
    query_string = {"_id": product_id}
    try:
        products.update_one(query_string, {'$set': {'status': status}})
        if status == 'Approved':
            _log.info('changing status to approved')
            auct = Auction(product_id)
            create_auction(auct)
        op_success = status
        _log.info('Status updated for product ID %s', product_id)
    except:
        op_success = None
        _log.info('Status not updated for product ID %s', product_id)
    return op_success


# Read operations
def read_all_users():
    '''Retrieve all users'''
    return list(users.find({}))

def read_all_bidders():
    '''Retrieve all bidders'''
    return users.find({'history': {'$exists': True}})

def read_all_employees():
    '''Retrieve all employees'''
    return users.find({'role': {'$exists': True}})

def read_user_by_id(user_id: int):
    '''Retrieve a User by their id in the database'''
    query_string = {'_id': int(user_id)}
    return users.find_one(query_string)

def read_user_by_username(username: str):
    '''Retrieve a user by their username'''
    query_string = {'username': username}
    return users.find_one(query_string)

def read_product_by_id(product_id: int):
    '''Retrieve a product by ID'''
    query_string = {"_id": product_id}
    return products.find_one(query_string)

def read_all_products():
    '''Retrieve all products'''
    return list(products.find({}))

def read_auction_by_id(auction_id: int):
    '''Retireve an auction or bid by id'''
    query_string = {"_id": auction_id}
    return auctions.find_one(query_string)

def read_all_auctions():
    '''Retrieves all auctions'''
    return list(auctions.find({}))

def read_products_from_query(query_dict):
    '''Retrieves specified products based on query_dict'''
    returned_products = list(products.find(query_dict))
    return_struct = []
    for product in returned_products:
        product_doc = read_product_by_id(int(product['_id']))
        print(product)
        product['id'] = product_doc
        return_struct.append(product)
    return return_struct

def read_auctions_from_query(query_dict):
    '''This function will take in a dict of query arguments and return the matching auctions'''
    returned_auctions = list(auctions.find(query_dict))
    return_struct = []
    for auction in returned_auctions:
        product_doc = read_product_by_id(int(auction['item_id']))
        print(auction)
        auction['item'] = product_doc
        return_struct.append(auction)
    return return_struct

def read_product_info_by_user_history(user_id):
    bidder = Bidder.from_dict(read_user_by_id(int(user_id)))
    product_history = []
    for bid in bidder.get_history():
        auct = read_auction_by_id(bid['auction_id'])
        _log.debug(auct)
        prod = read_product_by_id(auct['item_id'])
        product_history.append({'auction_id': bid['auction_id'], 'name': prod['name'], 'description': prod['description']})
    return product_history

def login(username: str, password: str):
    '''A function that takes in a username and returns a user object with that username'''
    _log.debug('Attempting to retrieve user from database')
    query_dict = {'username': username}
    user_dict = users.find_one(query_dict)
    if user_dict['password'] == password:
        _log.debug(user_dict)
        _log.debug(type(user_dict))
        # Ternary is "True value" if <condition> else "False Value"
        if user_dict:
            if 'role' in user_dict:
                return_user = Employee.from_dict(user_dict)
            else:
                return_user = Bidder.from_dict(user_dict)
        else:
            return_user = None
        return return_user
    else:
        return None
    # return Bidder.from_dict(user_dict) or Employee.from_dict(user_dict) if user_dict else None

def check_auction_expirations():
    '''This function will check through all Active auctions to see if they should be expired'''
    active_auctions = list(auctions.find({'status': 'Active', 'expiration_type': 'Automatic'}))
    for auction in active_auctions:
        if auction['date_end'] < datetime.datetime.now():
            expire_auction(auction['_id'])
        else:
            _log.debug('Auction %s not expired yet', auction['_id'])

def expire_auction(auction_id):
    '''This function will expire an auction'''
    auction_id = int(auction_id)
    this_auction = read_auction_by_id(auction_id)
    if len(this_auction['bids']) > 0:
        highest_bid = max(this_auction['bids'], key=lambda x: x['amount'])
        auction_end(auction_id, highest_bid['bidder_id'])
        _log.info('Auction expired with winner')
    else:
        auctions.update_one({'_id': auction_id}, {'$set': {'status': 'Listed'}})
        _log.info('Auction expired with no winner')

#Update Functions
def auction_start(auction_id, duration):
    '''This function will change the status of an auction with the given status'''
    query_string = {'_id': auction_id}
    date_now = datetime.datetime.now()
    date_end = date_now + datetime.timedelta(days=duration)
    if duration == 0:
        expiration_type = 'Manual'
    else:
        expiration_type = 'Automatic'
    update_string = {'$set': {'date_start': date_now, 'date_end': date_end,
                              'expiration_type': expiration_type, 'status': 'Active'}}
    updated_auction = auctions.find_one_and_update(query_string, update_string,
                                                   return_document=pymongo.ReturnDocument.AFTER)
    _log.debug(updated_auction)

    return updated_auction

def auction_end(auction_id, bidder_id):
    '''Find and end the specified auction. Sets the auction winner, and updates bid history
    of bidders involved.'''
    bidder_id = int(bidder_id)
    auction_id = int(auction_id)
    query_string = {'_id': auction_id}
    auct = Auction.from_dict(read_auction_by_id(auction_id))
    bid_list = auct.get_bids()
    winning_bid = None
    for bid in bid_list:
        if int(bid['bidder_id']) == bidder_id:
            winning_bid = bid
            bidder_doc = read_user_by_id(int(bid['bidder_id']))
            try:
                bidder = Bidder.from_dict(bidder_doc)
                bidder.create_history(auction_id, float(bid['amount']), 'Win')
                users.update_one({'_id': bidder_id}, {'$set': bidder.to_dict()})
            except TypeError as err:
                _log.error('Encountered an error: %s', err)
        else:
            bidder_doc = read_user_by_id(int(bid['bidder_id']))
            try:
                bidder = Bidder.from_dict(bidder_doc)
                bidder.create_history(auction_id, float(bid['amount']), 'Loss')
                users.update_one({'_id': int(bid['bidder_id'])}, {'$set': bidder.to_dict()})
            except TypeError as err:
                _log.error('Encountered an error: %s', err)
    try:
        date_now = datetime.datetime.now()
        auctions.update_one(query_string, {'$set': {'status': 'Closed', 'bids': winning_bid,
                                                    'date_end': date_now}})
        op_success = winning_bid
    except:
        op_success = None
    _log.info(' to auction %s', auction_id)
    return op_success

def update_user_info(user_id: int, user_info: dict):
    '''Updates user information'''
    query_string = {'_id': int(user_id)}
    update_string = {'username': user_info['username'], 'password': user_info['password']}
    try:
        users.update_one(query_string, {'$set': update_string})
        op_success = user_info
        _log.info('Updated information for user ID %s', user_id)
    except:
        op_success = None
        _log.info('Could not update information for user ID %s', user_id)
    return op_success

def delete_user(user_id):
    '''Deletes a user with specified id. Rejects deletion if they are a manager.
    Also removes any active bids with connected to user.'''
    user_query_string = {'_id': int(user_id)}
    query_string = {'status': 'Active', 'bids.bidder_id': user_id}
    try:
        user = read_user_by_id(user_id)
        if 'role' in user and user['role'].upper() == 'MANAGER':
            return 'Cannot delete a manager.'
        users.delete_one(user_query_string)
        auctions.update_many(query_string, {'$pull': {'bids': {'bidder_id': user_id}}})
        op_success = user_id
        _log.info('Deleted user ID %s', user_id)
    except:
        op_success = None
        _log.info('Could not delete user ID %s', user_id)
    return op_success



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
