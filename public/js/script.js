feather.replace();

var modalContent = document.getElementById('modal')
var select = document.getElementById('data_select')

function verifyOption(){
    var option = select.options[select.selectedIndex].value;
    if (option == "noticias"){
        noticias.style.display="block"
        eventos.style.display="none"
        projetos.style.display="none"
    } else if (option == "eventos"){
        eventos.style.display="block"
        noticias.style.display="none"
        projetos.style.display="none"
    } else if (option == "projetos"){
        projetos.style.display="block"
        noticias.style.display="none"
        eventos.style.display="none"
    } else{
        noticias.style.display="none"
        eventos.style.display="none"
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

