feather.replace();

var modalContent = document.getElementById('modal')
var dropContent = document.getElementsByClassName('drop-content')

function dropDown(){
    for (var i = 0; i < 3; i++){
        dropContent[i].style.display="block"       
    }
}

function closeDropDown(){
    for (var i = 0; i < 3; i++){
        dropContent[i].style.display="none"
    }
}

function verifyOption(value){
    if (value == "noticias"){
        noticias.style.display="block"
    } else if (value == "eventos"){
        eventos.style.display="block"
    } else{
        projetos.style.display="block"
    }
}

function verifyOptionOut(value){
    if (value == "noticias"){
        noticias.style.display="none"
    } else if (value == "eventos"){
        eventos.style.display="none"
    } else{
        projetos.style.display="none"
    }
}

function openModal(){
    modalContent.style.display="block"
}

function closeModal(){
    modalContent.style.display="none"
}

var map = L.map('map', {
    center: [-16.166073148734803, -51.550334113559636],
    zoom: 5
});
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=L2MMuN0QVt7kuMWSYezJ',{
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

fetch('http://localhost:4000/coordenadas')
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++){
            L.marker([data[i].lat_log[0], data[i].lat_log[1]]).addTo(map)
            .bindPopup(`<a href="http://localhost:4000/escola/${data[i].id}">${data[i].nome}</a>`)
        }
    
    })

