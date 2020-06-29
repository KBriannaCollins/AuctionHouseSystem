''' This file will handle database functionality '''

import os
import pymongo

''' Ensure taht your MONGO_URI environment variable is set to your mongo connection URI. '''
MONGO_URI = os.getenv('MONGO_URI')

# Initialize mongo conection
mongo = pymongo.MongoClient(MONGO_URI) # Open the database connection

# Database and collection names
db = mongo.projecttwo
util = db['utilities']



def get_id_counter():
    '''This function will get a unique ID by pulling it from the counter field of a counter
    document, then increase the counter value.'''
    return util.find_one_and_update({'_id': 'ID_COUNTER'},
                                    {'$inc': {'count': 1}},
                                    return_document=pymongo.ReturnDocument.AFTER)['count']

if __name__ is "__main__":
    ''' This is the database initialization functionality '''
    util.drop()
    util.insert_one({'_id': 'ID_COUNTER', 'count': 0})
