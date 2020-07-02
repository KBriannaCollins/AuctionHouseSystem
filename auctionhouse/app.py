''' This is the main file. Ensure that this is set as the FLASK_APP environment variable '''

from flask import Flask, request, make_response, jsonify, render_template
from flask_cors import CORS
from auctionhouse.router.users import users
from auctionhouse.router.auctions import auctions
import werkzeug

#Initialize Flask
app = Flask(__name__)

#initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# , resources={r"/*": {"origins": "*"}}, supports_credentials=True

# Blueprints
app.register_blueprint(users)
app.register_blueprint(auctions)



@app.route('/')
def entry_page():
    return {}, 200