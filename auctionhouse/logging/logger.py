''' This is the Logger. This will be used for logging. '''

import logging
import logging.config
from os import path

log_file_path = path.join(path.dirname(path.abspath(__file__)), 'log.conf')

logging.config.fileConfig(log_file_path)

def get_logger(logger_name):
    '''Returns a logger for the module that called it'''
    return logging.getLogger(logger_name)
