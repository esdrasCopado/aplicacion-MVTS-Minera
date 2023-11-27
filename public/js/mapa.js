 // La función initMap se llamará cuando la API de Google Maps se cargue correctamente
 function initMap() {
    // Coordenadas para centrar el mapa (ejemplo: Madrid)
    var madrid = { lat: 27.491220128868694, lng: -109.97368185408344 };
    
    // Opciones del mapa
    var mapOptions = {
        zoom: 17,
        center: madrid
    };

    // Crear el mapa en el div con el id 'map'
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Añadir la capa de tráfico al mapa
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    /** 
     * colocar imagenes de semoforos dentro del mapa
     * 
    // Coordenadas geográficas donde deseas posicionar la imagen (ejemplo: Barcelona)
    var imageLocation = { lat: 27.493141513330936, lng: -109.97580098675188 };
    

    // Esperar a que el mapa se haya cargado completamente
    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        // Convertir las coordenadas geográficas a píxeles en el mapa
        var imageLatLng = new google.maps.LatLng(imageLocation.lat, imageLocation.lng);
        var imagePixel = map.getProjection().fromLatLngToPoint(imageLatLng);

        // Crear la imagen y establecer su posición
        var image = document.createElement('img');
        image.src = 'img/gratis-png-semaforo.png'; // Ruta a tu imagen
        image.style.width = '100px'; // Ancho de la imagen
        image.style.height = '100px'; // Altura de la imagen
        image.style.left = (imagePixel.x * Math.pow(2, map.getZoom())) + 'px'; // Posición horizontal
        image.style.top = (imagePixel.y * Math.pow(2, map.getZoom())) + 'px'; // Posición vertical
        image.style.opacity = '0.7'; // Opacidad (0 a 1)
        image.style.position = 'absolute';
        image.style.borderRadius = '50%'; // Opcional: dar forma circular a la imagen

        // Añadir la imagen al div con el id 'imageOverlay'
        document.getElementById('imageOverlay').appendChild(image);
        
    });**/

}

