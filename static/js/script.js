$(document).ready(() => {
    listGuests()


    $('#button_submit').click(function() {
        var check_box_values = $('#myForm [type="checkbox"]:checked').map(function () {
            return this.value;
        }).get();
        search_api_guests = check_box_values.join(',')
        url = 'http://127.0.0.1:5000/api/search?guests=' + search_api_guests
        console.log(url)
        axios.get(url)
          .then((response) => {
            renderEpisodes(response.data)
          });

    });




})

function renderEpisodes(episodes){
    $(".episodes").html('')
    episodes.forEach(episode => {
        $(".episodes").append(`<div class="item--episode"><a href="${episode.link}" id="${episode.number}">${episode.name}<a/><img src="${episode.imgUrl}"></div>`)
    });
}

function listGuests(){
    guests.forEach((guest, i) => {
        $("#guests").append(`<div class="item--guest"><input type="checkbox" id="${i}" name="guests[]" value="${guest}"><label for="${i}">${guest}<label/></div>`)
    });
}