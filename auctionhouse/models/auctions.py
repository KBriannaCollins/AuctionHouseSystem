'''This module defines the module for auctions, products, and bids'''

class Product():
    def __init__(self, name='', description='', start_bid=0):
        self._id = -1
        self.name = name
        self.description = description
        self.start_bid = start_bid
        self.status = 'Proposed'
    
    def get_id(self):
        '''return the id of the product'''
        return self._id
        
    def get_name(self):
        '''returns the item name'''
        return self.name
    
    def get_description(self):
        '''returns the item description'''
        return self.description
    
    def get_start_bid(self):
        '''returns the starting bid'''
        return self.start_bid

    def get_status(self):
        return self.status
    
    def set_id(self, db_id):
        '''takes in a new id and updates it'''
        self._id = db_id

    def set_name(self, new_name):
        '''takes in a new name and updates it'''
        self.name = new_name
    
    def set_description(self, new_description):
        '''takes in a new description and updates it'''
        self.description = new_description
    
    def set_start_bid(self, new_start):
        '''takes in a new start bid and updates it'''
        self.start_bid = new_start
    
    def set_status(self, new_status):
        self.status = new_status

    def to_dict(self):
        '''Creates a dict from an instance of a product'''
        return self.__dict__

    @classmethod
    def from_dict(cls, input_product):
        '''Creates an instance of a product from a dictionary input'''
        product = Product()
        product.__dict__.update(input_product)
        return product


class Auction():
    def __init__(self, item_id=-1):
        self._id = -1
        self.auct_id = -1
        self.item_id = item_id
        self.bids = []
        self.status = 'Listed'
        self.expiration_type = 'Manual'
        self.date_start = None
        self.date_end = None
    
    def get_id(self):
        '''return the id of the auction'''
        return self._id
        
    def get_auct_id(self):
        '''return the id of the auctioneer'''
        return self.auct_id
    
    def get_item_id(self):
        '''returns the item id'''
        return self.item_id
    
    def get_bids(self):
        '''returns the list of bids'''
        return self.bids
    
    def get_status(self):
        '''returns the auction status'''
        return self.status
    
    def get_expiration_type(self):
        '''returns the expiration type'''
        return self.expiration_type
    
    def get_date_start(self):
        '''returns the start date'''
        return self.date_start
    
    def get_date_end(self):
        '''returns the end date'''
        return self.date_end
        
    def set_id(self, new_id):
        '''takes in a new ID'''
        self._id = new_id

    def set_auct_id(self, auct_id):
        '''takes in a new auction new ID'''
        self.auct_id = auct_id
    
    def set_item_id(self, new_item_id):
        '''takes in a new item id and updates it'''
        self.item_id = new_item_id
    
    def set_bids(self, new_bids):
        '''takes in a new bid list and updates it'''
        self.bids = new_bids
    
    def set_status(self, new_status):
        '''takes in a new status and updates it'''
        self.status = new_status
    
    def set_expiration_type(self, new_type):
        '''takes in new expiration type and updates it'''
        self.expiration_type = new_type
    
    def set_date_start(self, new_start):
        '''takes in a new start date and updates it'''
        self.date_start = new_start
    
    def set_date_end(self, new_end):
        '''takes in a new end date and updates it'''
        self.date_end = new_end
    

    def add_bid(self, plus_bid):
        '''appends a bid to the bid list'''
        self.bids.append(plus_bid)
    
    def to_dict(self):
        '''Creates a dict from an instance of an auction'''
        return self.__dict__
    @classmethod
    def from_dict(cls, input_auction):
        '''Creates an instance of a auction from a dictionary input'''
        auction = Auction()
        auction.__dict__.update(input_auction)
        return auction


class Bid():
    def __init__(self, bidder_id='', item_id='', amount=0):
        self._id = -1
        self.bidder_id = bidder_id
        self.item_id = item_id
        self.amount = amount

    def get_id(self):
        '''return the id of the auctio'''
        return self._id

    def get_amount(self):
        '''returns the amount of the bid'''
        return self.amount
    
    def get_bidder_id(self):
        '''returns the bidder id'''
        return self.bidder_id
    
    def get_item_id(self):
        '''returns the item id'''
        return self.item_id

    def set_id(self, new_id):
        self._id = new_id

    def to_dict(self):
        '''Creates an instance of a user from a dictionary input'''
        return self.__dict__
    @classmethod
    def from_dict(cls, input_bid):
        '''Creates an instance of a bid from a dictionary input'''
        bid = Bid()
        bid.__dict__.update(input_bid)
        return bid
