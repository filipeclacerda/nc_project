import json
import requests
from Episode import Episode
from constants import URL


def refreshEpisodesList():
    r = requests.get(URL)
    with open("all_ncs.json", "w") as outfile:
        outfile.write(json.dumps(r.json(), indent=4))
    return r.json()


def getRawEpisodesList():
    with open('all_ncs.json', 'r') as openfile:
       return json.load(openfile)


def filterEpisodes(product, filters):
    if product in filters:
        return True
    return False


def getEpisodes():
    raw_episodes = getRawEpisodesList()["data"]
    episodes = []
    for episode in raw_episodes:
        if filterEpisodes(episode["product"], ["nerdcast","caneca-de-mamicas"]):
            episodes.append(Episode(episode["title"], episode["url"], episode["episode"], episode["guests"], episode["image"], episode["pub_date"]))
    return episodes


def getAllEpisodesJson():
    return jsonEpisodes(getEpisodes())


def searchEpisodesByGuests(guests):
    episodes = getEpisodes()
    searchResults = []
    for episode in episodes:
        if set(guests).issubset((set(episode.guests))):
            searchResults.append(episode)
    return jsonEpisodes(searchResults)


def jsonEpisodes(episodes):
    json_episodes = []
    for episode in episodes:
        json_episode ={
            "number": episode.number,
            "name": episode.name,
            "link": episode.link,
            "guests": episode.guests,
            "imgUrl": episode.imgUrl,
            "pub_date": episode.pub_date
        }
        json_episodes.append(json_episode)
    return json_episodes


def printResults(episodes):
    for episode in episodes:
        print(episode.number + ' - ' + episode.name + ': ' + episode.link)