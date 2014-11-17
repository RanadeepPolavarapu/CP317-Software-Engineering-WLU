//  ===============================================================
//  Title: core.js
//  Project: Assignment #3
//  Date: Tuesday, Nov. 18, 2014
//  Written for: CP317-A
//  Authors: (Group #4)
//      Ranadeep Polavarapu - (120443120) - (pola3120@mylaurier.ca)
//      Bruno Salapic - (100574460) - (sala4460@mylaurier.ca)
//      Lee Glendenning - (120289190) - (glen9190@mylaurier.ca)
//      Ryan Burke - (120543180) - (burk3180@mylaurier.ca)
//  ===============================================================

/**
 * Makes a HTTP GET request to the postal code database server and determines the location
 * of the postal code given a valid postal code. Then, the response is displayed in an alert.
 * If postal code is invalid, then the corresponding error response from server is also
 * displayed in an alert.
 *
 * Better to declare a function like this as this way the function is declared and initialized
 * during parsetime rather than runtime for a "var function()" declaration. This is better for
 * on DOM ready.
 */
function postalCodeLookup() {
    $('#postal-code-lookup-form').submit(function(event) {

        // Lock and prevent the default form from actually submitting.
        // Can also return false at the bottom of this function to emulate this however, this is more elegant and proper.
        event.preventDefault();

        // base URL where we will be making HTTP requests to.
        var baseURL = "http://hopper.wlu.ca/~choang/iPhone/http/getLocationFromFile.php";
        var postalCodeSearched = $("input[name='zip']").val();

        $.ajax({
            type: "GET", // Make a GET request.
            url: baseURL,
            data: $("#postal-code-lookup-form").serialize(), // serializes the postal code form's elements.
            success: function(response) {
                alert("The postal code " + postalCodeSearched + " is located at " + response); // Display the response in an alert.
            },
        });
    });
}

$(function() { // Wait till DOM (Document Object Model) is ready.
    postalCodeLookup();
});