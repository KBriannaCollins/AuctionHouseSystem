''' This is the main file. Ensure that this is set as the FLASK_APP environment variable '''

import datetime

from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from auctionhouse.router.users import users
from auctionhouse.router.auctions import auctions
from auctionhouse.router.products import products
from auctionhouse.data.db import check_auction_expirations
import werkzeug

#Initialize Flask
app = Flask(__name__)

#initialize scheduler
scheduler = BackgroundScheduler()

#This adds a scheduled job to the scheduler
scheduler.add_job(func=check_auction_expirations, trigger="interval", seconds=10)

#This starts the scheduler
scheduler.start()

#initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# , resources={r"/*": {"origins": "*"}}, supports_credentials=True


# Blueprints
app.register_blueprint(users)
app.register_blueprint(auctions)
app.register_blueprint(products)

# This registers the shutdown for the scheduler when the program exits
atexit.register(lambda: scheduler.shutdown())

@app.route('/')
def entry_page():
    return {}, 200
