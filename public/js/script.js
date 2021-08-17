feather.replace();

var map = L.map('map', {
    center: [-16.166073148734803, -51.550334113559636],
    zoom: 5
});
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=L2MMuN0QVt7kuMWSYezJ',{
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);

    L.marker([-29.886586769594576, -50.26717977314782]).addTo(map)
    .bindPopup('Escola General Osório')
    .openPopup();
    L.marker([-29.897633497254294, -50.26138925509925]).addTo(map);
    L.marker([-29.897633497254294, -57.26138925509925]).addTo(map)
    .bindPopup('Teste')
    .openPopup();
    L.marker([-29.897633497254294, -57.28]).addTo(map);