from flask import Flask
from flask_cors import CORS
from flask import request
from main import getAllEpisodesJson, refreshEpisodesList, searchEpisodesByGuests

application = Flask(__name__)
app = application
CORS(app, resources={r"/api/*": {"origins": "*"}})

@application.route("/")
def hello():
    return {"hello":"mundo"}


@application.route("/api/search")
def guests():
    guests = request.args.get('guests', type=str)
    
    if guests == '':
        response = getAllEpisodesJson()
    else:
        response = searchEpisodesByGuests(guests.split(','))

    return response

@application.route("/api/refresh")
def refresh():
    response = refreshEpisodesList()
    return response
 
app.run()