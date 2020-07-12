''' Database Test Cases '''

# External Modules
import unittest
import unittest.mock as mock

from auctionhouse.data.db import read_auctions_from_query


from auctionhouse.data.db import read_all_users

class TestClassDB(unittest.TestCase):
    ''' The DB test suite '''
    
    @mock.patch(users.find) # Mock the users.find function
    def test_read_all_users(self, mock_find):
        mock_find.return_value = {'_id':'id'} # set the return value of the mock

        self.assertTrue(mock_find.called)


if __name__ == '__main__':
    unittest.main()