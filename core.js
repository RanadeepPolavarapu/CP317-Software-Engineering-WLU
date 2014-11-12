var baseURL = "http://hopper.wlu.ca/~choang/iPhone/http/"

var getPostalCodeGeoLocation= $.ajax({
    type: "GET",
    url: baseURL + "getLocationFromFile.php",
    data: "zip=<somePostalCode>",
    success: function(httpMessage){
       alert( httpMessage );
    }
});

// Note: Check for access control origin header on hopper's response headers, if it doesn't exist, set cordova access control to include hopper.
