''' This is the main file. Ensure that this is set as the FLASK_APP environment variable '''

from flask import Flask
from flask_cors import CORS
from auctionhouse.router.users import users
from auctionhouse.router.auctions import auctions

#Initialize Flask
app = Flask(__name__)

# Blueprints
app.register_blueprint(users)
app.register_blueprint(auctions)

#initialize CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def entry_page():
    return {}, 200