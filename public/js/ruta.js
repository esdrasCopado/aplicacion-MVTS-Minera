function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 27.491220128868694, lng: -109.97368185408344 },
      zoom: 12,
    });

    //agrega la capa de trafico al mapa
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);


    const infoWindow = new google.maps.InfoWindow();
  

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            infoWindow.setPosition(pos);
            infoWindow.setContent("Posicion conductor");
            infoWindow.open(map);
            map.setCenter(pos);
  
            // Crear la solicitud de la ruta
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer({
              map: map,
              suppressMarkers: true,
            });
  
            const request = {
              origin: pos, // Utiliza la posición actual como origen
              destination: { lat: 27.491187260439908,lng: -109.97148273361931}, // Agrega las coordenadas del destino en este caso el itson
              travelMode: "DRIVING",
            };
  
            directionsService.route(request, (response, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(response);
              } else {
                window.alert("Error al mostrar la ruta: " + status);
              }
            });
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // navegador no soporta la geolocalizacion
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }