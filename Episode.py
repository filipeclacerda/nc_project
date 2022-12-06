class Episode:

    def __init__(self, name, link, number, guests, imgUrl):
        self.name = name
        self.link = link
        self.number = number
        self.guests = guests.split(',')
        self.imgUrl = imgUrl


    def getEpisodeInfo(self):
        return self.number + ' - ' + self.name + ': ' + self.link


    def getGuests(self):
        return self.guests