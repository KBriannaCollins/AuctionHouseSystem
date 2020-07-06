'''Unit testing for classes Product, Auction, and Bid'''
import unittest

from auctionhouse.models.auctions import Product, Auction, Bid
from auctionhouse.logging.logger import get_logger
_log = get_logger(__name__)

class ProductTestSuite(unittest.TestCase):
    '''Test suite for Product class'''
    product = None
    def setUp(self):
        self.product = Product('name', 'description', 0)
    def tearDown(self):
        self.product = None
    @classmethod
    def setUpClass(cls):
        cls.product = Product()
    @classmethod
    def tearDownClass(cls):
        cls.product = None

    '''getters'''
    def test_get_id(self):
        self.assertEqual(self.product._id, self.product.get_id())
    def test_get_name(self):
        self.assertEqual(self.product.name, self.product.get_name())
    def test_get_description(self):
        self.assertEqual(self.product.description, self.product.get_description())
    def test_get_start_bid(self):
        self.assertEqual(self.product.start_bid, self.product.get_start_bid())
    def test_get_status(self):
        self.assertEqual(self.product.status, self.product.get_status())
   
    
    '''setters'''
    def test_set_id(self):
        self.product.set_id(10)
        self.assertEqual(10, self.product._id)
    def test_set_name(self):
        self.product.set_name("named")
        self.assertEqual(self.product.name, "named")
    def test_set_description(self):
        self.product.set_description("desc")
        self.assertEqual(self.product.description, "desc")
    def test_set_start_bid(self):
        self.product.set_start_bid(1)
        self.assertEqual(self.product.start_bid, 1)
    def test_set_status(self):
        self.product.set_status("Approved")
        self.assertEqual(self.product.status, "Approved")

    def test_to_dict(self):
        self.product = Product("name", "descript", 1)
        self.assertIs(type(self.product.to_dict()), dict)

    def test_from_dict(self):
        test_dict = {'name': 'name', 'description':'desc', 'start_bid': 1}
        self.product = Product().from_dict(test_dict)
        self.assertIs(type(self.product), Product)

class AuctionTestSuite(unittest.TestCase):
    '''Test suite for Auction class'''
    auction = None
    def setUp(self):
        self.auction = Auction(-1)
    def tearDown(self):
        self.auction = None
    @classmethod
    def setUpClass(cls):
        cls.auction = Auction()
    @classmethod
    def tearDownClass(cls):
        cls.auction = None

    '''getters'''
    def test_get_id(self):
        self.assertEqual(self.auction._id, self.auction.get_id())
    def test_get_auct_id(self):
        self.assertEqual(self.auction.auct_id, self.auction.get_auct_id())
    def test_get_item_id(self):
        self.assertEqual(self.auction.item_id, self.auction.get_item_id())
    def test_get_bids(self):
        self.assertEqual(self.auction.bids, self.auction.get_bids())
    def test_get_status(self):
        self.assertEqual(self.auction.status, self.auction.get_status())
    def test_get_expiration_type(self):
        self.assertEqual(self.auction.expiration_type, self.auction.get_expiration_type())
    def test_get_date_start(self):
        self.assertEqual(self.auction.date_start, self.auction.get_date_start())
    def test_get_date_end(self):
        self.assertEqual(self.auction.date_end, self.auction.get_date_end())

    '''setters'''
    def test_set_id(self):
        self.auction.set_id(10)
        self.assertEqual(10, self.auction._id)
    def test_set_auct_id(self):
        self.auction.set_auct_id(10)
        self.assertEqual(10, self.auction.auct_id)
    def test_set_item_id(self):
        self.auction.set_item_id(10)
        self.assertEqual(10, self.auction.item_id)
    def test_set_bids(self):
        bids = ['bid1', 'bid2']
        self.auction.set_bids(bids)
        self.assertEqual(bids, self.auction.bids)
    def test_set_status(self):
        self.auction.set_status("stat")
        self.assertEqual("stat", self.auction.status)
    def test_set_expiration_type(self):
        self.auction.set_expiration_type("type")
        self.assertEqual("type", self.auction.expiration_type)
    def test_set_date_start(self):
        self.auction.set_date_start("today")
        self.assertEqual("today", self.auction.date_start)
    def test_set_date_end(self):
        self.auction.set_date_end("today")
        self.assertEqual("today", self.auction.date_end)

    '''functions'''
    def test_add_bid(self):
        self.auction.add_bid("biddd")
        self.assertEqual(["biddd"], self.auction.bids)

    def test_to_dict(self):
        self.auction = Auction(4)
        self.assertIs(type(AuctionTestSuite.auction.to_dict()), dict)

    def test_from_dict(self):
        test_dict = {'item_id': 5}
        self.auction = Auction().from_dict(test_dict)
        self.assertIs(type(AuctionTestSuite.auction), Auction)
    

class BidTestSuite(unittest.TestCase):
    '''Test suite for User class'''
    bid = None
    def setUp(self):
        self.bid = Bid(-1,-1, 0)
    def tearDown(self):
        self.bid = None
    @classmethod
    def setUpClass(cls):
        cls.bid = Bid()
    @classmethod
    def tearDownClass(cls):
        cls.bid = None

    def test_get_id(self):
        self.assertEqual(self.bid._id, self.bid.get_id())
    def test_get_ammount(self):
        self.assertEqual(self.bid.amount, self.bid.get_amount())
    def test_get_bidder(self):
        self.assertEqual(self.bid.bidder_id, self.bid.get_bidder_id())
    def test_get_item(self):
        self.assertEqual(self.bid.item_id, self.bid.get_item_id())
    
    def test_set_id(self):
        self.bid.set_id(10)
        self.assertEqual(10, self.bid._id)

    def test_to_dict(self):
        self.bid = Bid(1,1,1)
        self.assertIs(type(self.bid.to_dict()), dict)

    def test_from_dict(self):
        test_dict = {'bidder_id': 1, 'item_id': 1, 'amount': 1}
        self.bid = Bid().from_dict(test_dict)
        self.assertIs(type(self.bid), Bid)
