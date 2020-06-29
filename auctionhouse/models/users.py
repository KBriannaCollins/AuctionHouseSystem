'''Defines the model for users'''
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
    
    def login(self, username, password):
        '''Confirms users username and password are a match'''
        if(self.username == username) and (self.password == password):
            return True
        return False
    
    def to_dict(self):
        '''Creates an instance of a user from a dictionary input'''
        return self.__dict__


class Bidder(User):
    '''A class that defines how Bidders should behave'''
    def __init__(self, username='', password=''):
        super().__init__(username, password)
        self.history = []
    
    def get_history(self):
        '''Gets bidders history'''
        return self.history
    
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