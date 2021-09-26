feather.replace();

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
        L.marker([data.lat_log[0], data.lat_log[1]]).addTo(map)
        .bindPopup(`<a href="http://localhost:4000/escola/${data.id}">${data.nome}</a>`)
        .openPopup();
        console.log(data.nome)
    })

