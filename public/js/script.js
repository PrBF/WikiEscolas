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

async function map(){

    fetch('https://wikiescolas.osorio.ifrs.edu.br/api')
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        for (var i = 0; i < data.length; i++){
            L.marker([data[i].lat_log[0], data[i].lat_log[1]]).addTo(map)
            .bindPopup(`<a href="https://wikiescolas.osorio.ifrs.edu.br/escola/${data[i].id}">${data[i].nome}</a>`)
        }
        var markersLayer = new L.LayerGroup();	
	
	    map.addLayer(markersLayer);

	    var controlSearch = new L.Control.Search({
	    	position:'topright',		
	    	layer: markersLayer,
	    	initial: false,
	    	zoom: 20,
	    });

	    map.addControl( controlSearch, {container: 'findbox'} );
    
	    for(i in data) {
	    	var nome = data[i].nome,	
	    		lat_log = data[i].lat_log,		
	    		marker = new L.Marker(new L.latLng(lat_log), {title: nome} );
	    	marker.bindPopup(`<a href="https://wikiescolas.osorio.ifrs.edu.br/escola/${data[i].id}">${data[i].nome}</a>`)
	    	markersLayer.addLayer(marker);
	    }

        $('#textsearch').on('keyup', function(e) {
            controlSearch.searchText( e.target.value );    
        })
    })
    
	var map = new L.Map('map', {center: [-16.166073148734803, -51.550334113559636],zoom: 5});	//set center from first location

    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=L2MMuN0QVt7kuMWSYezJ',{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(map);
	map.addLayer(new L.TileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=L2MMuN0QVt7kuMWSYezJ'));	//base layer


}

map();

