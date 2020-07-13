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

    def test_get_id(self):
        '''Test for the get_id function.'''
        self.user = User("username", "password")
        self.assertEqual(-1, UserTestSuite.user.get_id())
    def test_get_username(self):
        '''Test for the get_username function.'''
        self.user = User("username", "password")
        self.assertEqual("username", self.user.get_username())
    def test_get_password(self):
        '''Test for the get_password function.'''
        self.user = User("username", "password")
        self.assertEqual("password", self.user.get_password())

    def test_set_id(self):
        '''Test for the set_id function.'''
        UserTestSuite.user.set_id(10)
        self.assertEqual(10, UserTestSuite.user._id)
    def test_set_username(self):
        '''Test for the set_username funciton.'''
        UserTestSuite.user.set_username('hello')
        self.assertEqual('hello', UserTestSuite.user.username)

    def test_login(self):
        '''Test for the login function.'''
        self.user = User("username", "password")
        self.assertTrue(self.user.login("username", "password"))
        self.assertFalse(UserTestSuite.user.login("notusername", "notpassword"))

    def test_to_dict(self):
        '''Test for the to_dict function.'''
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
        '''Test for the get_history function.'''
        self.assertIs(type(BidderTestSuite.bidder.get_history()), list)

    def test_create_history(self):
        '''Test for the create_history function.'''
        BidderTestSuite.bidder.create_history(1, 0, 'Win')
        self.assertEqual([{'auction_id': 1, 'amount': 0, 'bid_status': 'Win'}],
                         BidderTestSuite.bidder.get_history())

    def test_from_dict(self):
        '''Test for the from_dict function.'''
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
        '''Test for the get_role function.'''
        self.emp = Employee("username", "password")
        self.assertEqual("Curator", EmployeeTestSuite.emp.get_role())

    def test_set_role(self):
        '''Test for the set_role function.'''
        EmployeeTestSuite.emp.set_role("role")
        self.assertEqual('role', EmployeeTestSuite.emp.role)

    def test_from_dict(self):
        '''Test for the from_dict function.'''
        test_dict = {'username': 'user', 'password': 'password', 'role': 'role'}
        self.emp = Employee().from_dict(test_dict)
        self.assertIs(type(EmployeeTestSuite.emp), Employee)
