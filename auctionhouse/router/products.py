'''This is the Products router. It will handle HTTP requests for Products.'''

from flask import Blueprint, jsonify, request
from auctionhouse.data.db import create_product
from auctionhouse.models.auctions import Product
import auctionhouse.data.db as db

from auctionhouse.logging.logger import get_logger

_log = get_logger(__name__)

products = Blueprint('products', __name__)

@products.route('/products', methods=['GET', 'POST', 'PUT'])
def products_main():
    '''This is the main /products routes.'''
    required_fields = ['name', 'description', 'start_bid']
    if request.method == 'POST':
        input_dict = request.get_json(force=True)
        _log.debug('Product POST request received with body %s', input_dict)
        if all(field in input_dict for field in required_fields):
            name = input_dict['name']
            description = input_dict['description']
            start = input_dict['start_bid']
            new_product = Product(name, description, start)
            create_product(new_product)
            return jsonify(new_product.to_dict()), 201
        else:
            return request.json, 400
    elif request.method == 'GET':
        _log.debug('GET request for products')
        _log.debug(db.read_all_products())
        return jsonify(db.read_all_products()), 200
    else:
        pass

@products.route('/products/<int:product_id>', methods=['GET', 'PUT'])
def get_product(product_id):
    '''This is for requests associated with a Product ID'''
    if request.method == 'GET':
        _log.debug('GET request for products by ID')
        product = db.read_product_by_id(product_id)
        if product:
            return jsonify(db.read_product_by_id(product_id)), 200
    elif request.method == 'PUT':
        input_dict = request.get_json(force=True)
        if db.update_product_status(input_dict['_id'], input_dict['status']):
            return request.json, 204
        else:
            return request.json, 400
    else:
        pass
