
from flask import Flask, Blueprint, jsonify, request, make_response
from auctionhouse.data.db import create_product
from auctionhouse.models.auctions import Product
from auctionhouse.data.db as db

from auctionhouse.logging.logger import get_logger

_log = get_logger(__name__)

products = Blueprint('products', __name__)

@products.route('/products', methods=['POST', 'GET'])
def products_main():
    required_fields = ['name', 'description', 'start_bid']
    if request.method == 'POST':
        input_dict = request.get_json(force=true)
        _log.debug('Product POST request received with body %s', input_dict)
        if all(field in input_dict for field in required_fields):
            name = input_dict['name']
            description = input_dict['description']
            start = input_dict['start_bid']
            newProduct = Product(name, description, start)
            create_product(newProduct)
            return jsonify(newProduct.to_dict()), 201
        else:
            return request.json, 400
    elif request.method == 'GET':
        _log.debug('GET request for products')
        return jsonify(db.read_all_products), 200
    else:
        pass

@products.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    if request.method == 'GET':
        _log.debug('GET request for products by ID')
        product = db.read_product_by_id(product_id)
        if product:
            return jsonify(db.read_product_by_id(product_id)), 200
