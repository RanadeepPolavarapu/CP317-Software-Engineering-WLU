var baseURL = "http://hopper.wlu.ca/~choang/iPhone/http/"

var getPostalCodeGeoLocation= $.ajax({
    type: "GET",
    url: baseURL + "getLocationFromFile.php",
    data: "zip=<somePostalCode>",
    success: function(httpMessage){
       alert( httpMessage );
    }
});