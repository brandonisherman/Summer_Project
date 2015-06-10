// Initializes an interactive Google Map with a geocoder
var geocoder;
var map;
function initialize() {
    geocoder = new google.maps.Geocoder();
    var lat = 38.8977;  // latitude and longitude of the White House
    var long = -77.0366;
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(lat,long),
        zoom: 17,  // 13 should be default, but we changed the value for debugging purposes
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    google.maps.event.addDomListener(window, 'load', initialize);
}

function codeAddress() {
    /* address is a concatenation of all of the properties of an address
     that the user input into the userInfo form.

     More information on geocoding available at
     https://developers.google.com/maps/documentation/javascript/geocoding
    */

    var address = "";   // Initializing as an empty string avoids undefined value
    var addressArray = document.getElementsByName("address");
    for (var i=0; i < addressArray.length; i++) { // -1 makes sure we don't concatenate zip code
        /* The below switch block concatenates fields to make an address field. */
        switch(addressArray[i].id) {
            case ("aptNumber" || "zip"):  // aptNumber and zip fields will make the geolocation request fail
                break;
            case ("street"):
                address += addressArray[i].value + ", ";
                break;
            case ("city"):
                address += addressArray[i].value + ", ";
                break;
            default:
                address += addressArray[i].value + " ";
        }
    }
    geocoder.geocode({'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker( {
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    })

}