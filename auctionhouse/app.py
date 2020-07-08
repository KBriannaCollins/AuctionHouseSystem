''' This is the main file. Ensure that this is set as the FLASK_APP environment variable '''

from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler
from auctionhouse.router.users import users
from auctionhouse.router.auctions import auctions
from auctionhouse.router.products import products
import werkzeug

#Initialize Flask
app = Flask(__name__)

#initialize scheduler
scheduler = BackgroundScheduler()

def print_date_time():
    print(time.strftime("%A, %d. %B %Y %I:%M:%S %p"))

scheduler.add_job(func=print_date_time, trigger="interval", seconds=3)
scheduler.start()

#initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# , resources={r"/*": {"origins": "*"}}, supports_credentials=True


# Blueprints
app.register_blueprint(users)
app.register_blueprint(auctions)
app.register_blueprint(products)

atexit.register(lambda: scheduler.shutdown())

@app.route('/')
def entry_page():
    return {}, 200
