var geocoder;  // A geocoder for map
var map;     // The actual interactive map on the page

// Initializes an interactive Google Map with a geocoder
function initialize() {
    geocoder = new google.maps.Geocoder();
    var lat = 38.8977;  // latitude and longitude of the White House
    var long = -77.0366;
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(lat,long),
        zoom: 17,  // 17 is a reasonably high zoom level
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

function codeAddress() {
    /* address is a concatenation of all of the properties of an address
     that the user input into the userInfo form.
     More information on geocoding available at
     https://developers.google.com/maps/documentation/javascript/geocoding
     */
    var address = "";   // Initializing as an empty string avoids undefined value
    var addressArray = document.getElementsByName("address");
    for (var i=1; i < addressArray.length; i++) { // Starting at 1 ensures we don't append undefined elements
        /* The below switch block concatenates fields to make an address field. */
        switch(addressArray[i].id) {
            case ("aptNumber" || "zip"):  // aptNumber and zip fields will make the geolocation request fail
                break;
            case ("streetName" || "city"):
                address += addressArray[i].value + ", ";
                break;
            default:   // i.e. for any element where we don't want to append a comma
                address += addressArray[i].value + " ";
        }
    }
    geocodeAddress(address);
}

function codeRuralRoute() {
    var address = "";
    var addressArray = document.getElementsByName("ruralRoute");
    for (var i=1; i < addressArray.length; i++) {  // Build the address from the html text boxes
        switch(addressArray[i].id) {
            case("rrZip"):
                break;
            case("boxNumber"):
                address += "Box " + addressArray[i].value + ", ";
                break;
            case("rrCity"):
                address += addressArray[i].value + ", ";
                break;
            default:
                address += addressArray[i].value + " ";

        }
    }
    geocodeAddress(address);
}

/* Note:  We have not yet figured out how to go from a P.O. Box to its respective post office,
   so this function geocodes just "<City>, <State>" for now.
 */
function codePOBox() {
    // var address = "US Post Office, ";
    var address = "";
    var addressArray = document.getElementsByName("poBox");
    for (var i=1; i < addressArray.length; i++) {
        switch(addressArray[i].id) {
            case("poCity"):
                address += addressArray[i].value + ", ";
                break;
            case("poState"):
                address += addressArray[i].value + " ";
                break;
            default:
                break;
        }
    }
    geocodeAddress(address);
}

function geocodeAddress(address) {
    geocoder.geocode({'address': address}, function(results, status) {
        /*  Essentially, partial_match is true whenever Google uses some sort of autocompletion
            to fix the user input
            Step 1- check if "partial_match" was defined
                  -  For some reason, "partial_match" isn't initialized when the user gives a valid input
            Step 2- if the user gave a bad input, warn them
                  -  for your real code, you should put something other than a snarky little message
            Information on partial_match can be found at
            https://developers.google.com/maps/documentation/geocoding/
        */

        if (typeof results[0].partial_match !== 'undefined') {
            alert("Not a correct and/or real address");
            return;  // Used for testing purposes; does not return anything on the map.
        }
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            // Erase the existing marker if there is already one displayed
            if (map.marker) {    // See lines 53 and 54 at http://jsfiddle.net/zbZ8p/1/
                map.marker.setMap(null);
                delete map.marker;
            }
            map.marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    })

}