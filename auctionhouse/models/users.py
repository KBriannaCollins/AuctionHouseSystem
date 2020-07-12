'''Defines the model for users'''
import json
import datetime
import jwt

from auctionhouse.logging.logger import get_logger

_log = get_logger(__name__)
_secret_key = '10101567unique'

class User():
    '''A class that defines how users should behave'''
    def __init__(self, username='', password=''):
        self._id = -1
        self.username = username
        self.password = password

    def get_id(self):
        '''Gets users ID'''
        return self._id
    def get_username(self):
        '''Gets users username'''
        return self.username
    def get_password(self):
        '''Gets users password'''
        return self.password

    def set_id(self, user_id):
        '''Takes in new user id and updates it.'''
        self._id = user_id

    def login(self, username, password):
        '''Confirms users username and password are a match'''
        if(self.username == username) and (self.password == password):
            return True
        return False

    def to_dict(self):
        '''Creates an instance of a user from a dictionary input'''
        return self.__dict__

    def encode_auth_token(self):
        ''' Generate an authentication token for this user '''
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': self.username
            }
            _log.debug("payload set")
            return jwt.encode(payload, _secret_key, algorithm='HS256')
        except Exception as e:
            _log.exception('Encode failed.')
            return e
    @staticmethod
    def decode_auth_token(auth_token):
        ''' Decode the auth token to receive the id of user '''
        try:
            payload = jwt.decode(auth_token, _secret_key)
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Token expired. please login again.'
        except jwt.InvalidTokenError:
            return 'Token invalid. Please login.'


class Bidder(User):
    '''A class that defines how Bidders should behave'''
    def __init__(self, username='', password=''):
        super().__init__(username, password)
        self.history = []
        '''history = [{auction_id, amount, w/l status}]'''

    def get_history(self):
        '''Gets bidders history'''
        return self.history

    def create_history(self, auction_id, amount, bid_status):
        '''Takes in an auction id and the amount and status of a bid and appends it to history.'''
        add_dict = {'auction_id': auction_id, 'amount': amount, 'bid_status': bid_status}
        self.history.append(add_dict)

    @classmethod
    def from_dict(cls, input_bidder):
        '''Creates an instance of a bidder from a dictionary input'''
        bidder = Bidder()
        bidder.__dict__.update(input_bidder)
        return bidder


class Employee(User):
    '''A class that defines how employees should behave'''
    def __init__(self, username='', password='', role='Curator'):
        super().__init__(username, password)
        self.role = role

    def get_role(self):
        '''Gets users role'''
        return self.role

    def set_role(self, new_role):
        '''Takes in a new role and updates the current role.'''
        self.role = new_role

    @classmethod
    def from_dict(cls, input_employee):
        '''Creates an instance of an employee from a dictionary input'''
        employee = Employee()
        employee.__dict__.update(input_employee)
        return employee


class UserEncoder(json.JSONEncoder):
    ''' Allows us to serialize our objects as JSON '''
    def default(self, o):
        return o.to_dict()
