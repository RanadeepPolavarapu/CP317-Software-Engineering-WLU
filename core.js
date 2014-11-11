var baseURL = "http://hopper.wlu.ca/~choang/iPhone/http/"

var getPostalCodeGeoLocation= $.ajax({
    type: "GET",
    url: "some.php",
    data: baseURL + "getLocationFromFile.php?" + "zip=<somePostalCode>",
    success: function(httpMessage){
       alert( httpMessage );
    }
});