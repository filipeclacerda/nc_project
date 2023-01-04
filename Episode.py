from datetime import datetime

class Episode:

    def __init__(self, name, link, number, guests, imgUrl, pub_date):
        self.name = name
        self.link = link
        self.number = number
        self.guests = guests.split(',')
        self.imgUrl = imgUrl
        self.pub_date = datetime.fromisoformat(pub_date).strftime("%d/%m/%Y")


    def getEpisodeInfo(self):
        return self.number + ' - ' + self.name + ': ' + self.link


    def getGuests(self):
        return self.guests