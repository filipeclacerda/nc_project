$(document).ready(() => {
    listGuests()
    clearAllGuests()
    $('#button_submit').click(function () {
        getEpisodesAPI(selectedGuests)

    });

    $('#button_refresh').click(function () {
        refreshEpisodes()

    });

    $('#search').on("input", () => {
        listGuests($('#search').val())
    })

    $('#button_clear').click( () => {
        clearAllGuests()
    })

    $(document).click(function() {
        document.getElementById("search").focus();
    });
})

let selectedGuests = []

function getEpisodesAPI(guests) {
    search_api_guests = guests.join(',')
    url = 'http://127.0.0.1:5000/api/search?guests=' + search_api_guests
    console.log(url)
    axios.get(url)
        .then((response) => {
            renderEpisodes(response.data)
        });
}

function refreshEpisodes() {
    search_api_guests = guests.join(',')
    url = 'http://127.0.0.1:5000/api/refresh'
    $('.loader').show()
    axios.get(url)
        .then((response) => {
            renderEpisodes(response.data)
        }).finally(()=>{
            $('.loader').hide()
        });
}

function renderEpisodes(episodes) {
    $(".episodes").html('')
    episodes.forEach(episode => {
        $(".episodes").append(`
        <div class="item--episode">
            <p class="date">${episode.pub_date}</p>
            <a href="${episode.link}" target="_blank"><img class="episode-image" src="${episode.imgUrl}"></a>
            <a class="episode--link" href="${episode.link}" target="_blank" id="${episode.number}">${episode.number} - ${episode.name}</a>
        </div>`)
    });
    $("#search").val("");
    $('.scroll').scrollTop(0);
}

function listGuests(filter) {
    if (filter) {
        filteredGuests = guests.filter(guest => guest.toUpperCase().includes(filter.toUpperCase()))
    } else {
        filteredGuests = guests
    }
    console.log(filter)
    console.log(filteredGuests)
    $("#guests").html('')
    filteredGuests.forEach((guest, i) => {
        p = `
        <p class="item--guest">
            <input type="checkbox" onchange="putOrRemoveGuest(this.value)" class="checkmark" id="${i}" name="guests" value="${guest}" ${selectedGuests.includes(guest) ? 'checked' : ''}>
            <label for="${i}">${guest}</label>
        </p>`
        if (selectedGuests.includes(guest)){
            $("#guests").prepend(p)
        }else{
            $("#guests").append(p)
        }
    });
}

function putOrRemoveGuest(guest) {
    const index = selectedGuests.indexOf(guest)
    if (index > -1) {
        selectedGuests.splice(index, 1)
    } else {
        selectedGuests.push(guest)
    }
    search_api_guests = selectedGuests.join(',')
    url = 'http://127.0.0.1:5000/api/search?guests=' + search_api_guests
    console.log(url)
    $('.loader').show()
    axios.get(url)
        .then((response) => {
            renderEpisodes(response.data)
        }).finally(()=>{
            $('.loader').hide()
            listGuests()
        });
}

function clearAllGuests(){
    selectedGuests = []
    url = 'http://127.0.0.1:5000/api/search?guests='
    $('.loader').show()
    axios.get(url)
        .then((response) => {
            renderEpisodes(response.data)
            listGuests()
        }).finally(()=>{
            $('.loader').hide()
        });
    }