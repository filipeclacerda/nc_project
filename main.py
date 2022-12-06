import json
import requests
from Episode import Episode
from constants import URL


def refreshEpisodesList():
    r = requests.get(URL)
    with open("all_ncs.json", "w") as outfile:
        outfile.write(json.dumps(r.json(), indent=4))


def getRawEpisodesList():
    with open('all_ncs.json', 'r') as openfile:
       return json.load(openfile)


def getEpisodes():
    raw_episodes = getRawEpisodesList()["data"]
    episodes = []
    for episode in raw_episodes:
        episodes.append(Episode(episode["title"], episode["url"], episode["episode"], episode["guests"]))
    return episodes


def SearchEpisodesByGuests(guests):
    episodes = getEpisodes()
    searchResults = []
    for episode in episodes:
        if set(guests).issubset((set(episode.guests))):
            searchResults.append(episode)
    printResults(searchResults)


def printResults(episodes):
    for episode in episodes:
        print(episode.number + ' - ' + episode.name + ': ' + episode.link)


SearchEpisodesByGuests(["Diogo Braga","Affonso Solano"])

