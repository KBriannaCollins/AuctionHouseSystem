'''Unit testing for classes User, Bidder, and Employee'''
import unittest

from auctionhouse.models.users import User, Bidder, Employee
from auctionhouse.logging.logger import get_logger
_log = get_logger(__name__)

class UserTestSuite(unittest.TestCase):
    '''Test suite for User class'''
    user = None
    def setUp(self):
        self.user = User('username', 'password')
    def tearDown(self):
        self.user = None
    @classmethod
    def setUpClass(cls):
        cls.user = User()
    @classmethod
    def tearDownClass(cls):
        cls.user = None

    '''getters'''
    def test_get_id(self):
        self.user = User("username", "password")
        self.assertEqual(-1, UserTestSuite.user.get_id())
    def test_get_username(self):
        self.user = User("username", "password")
        self.assertEqual("username", self.user.get_username())
    def test_get_password(self):
        self.user = User("username", "password")
        self.assertEqual("password", self.user.get_password())

    '''setters'''
    def test_set_id(self):
        UserTestSuite.user.set_id(10)
        self.assertEqual(10, UserTestSuite.user._id)
    
    '''other functions'''
    def test_login(self):
        self.user = User("username", "password")
        self.assertTrue(self.user.login("username", "password"))
        self.assertFalse(UserTestSuite.user.login("notusername", "notpassword"))
   
    #need to test encode auth toke and decode auth token

    '''dicts'''
    def test_to_dict(self):
        self.user = User('username', 'password')
        self.assertIs(type(UserTestSuite.user.to_dict()), dict)



class BidderTestSuite(unittest.TestCase):
    '''Test suite for Bidder class'''
    bidder = None
    def setUp(self):
        self.bidder = Bidder('username', 'password')
    def tearDown(self):
        self.bidder = None
    @classmethod
    def setUpClass(cls):
        cls.bidder = Bidder()
    @classmethod
    def tearDownClass(cls):
        cls.bidder = None

    def test_get_history(self):
        self.assertIs(type(BidderTestSuite.bidder.get_history()), list)

    def test_create_history(self):
        BidderTestSuite.bidder.create_history('name', 0, 'win')
        self.assertEqual([{'product_name': 'name', 'amount': 0, 'bid_status': 'win'}],
                         BidderTestSuite.bidder.get_history()) 

    def test_from_dict(self):
        test_dict = {'username': 'user', 'password': 'password', 'history': []}
        self.bidder = Bidder().from_dict(test_dict)
        self.assertIs(type(BidderTestSuite.bidder), Bidder)


class EmployeeTestSuite(unittest.TestCase):
    '''Test suite for Employee class'''
    emp = None
    def setUp(self):
        self.emp = Employee('username', 'password')
    def tearDown(self):
        self.emp = None
    @classmethod
    def setUpClass(cls):
        cls.emp = Employee()
    @classmethod
    def tearDownClass(cls):
        cls.emp = None

    def test_get_role(self):
        self.emp = Employee("username", "password")
        self.assertEqual("Curator", EmployeeTestSuite.emp.get_role())
    
    def test_set_role(self):
        EmployeeTestSuite.emp.set_role("role")
        self.assertEqual('role', EmployeeTestSuite.emp.role)

    def test_from_dict(self):
        test_dict = {'username': 'user', 'password': 'password', 'role': 'role'}
        self.emp = Employee().from_dict(test_dict)
        self.assertIs(type(EmployeeTestSuite.emp), Employee)

if __name__ == '__main__':
    unittest.main()