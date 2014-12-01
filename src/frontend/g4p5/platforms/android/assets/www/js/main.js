// Shorthand for $( document ).ready() (On DOM Ready)
$(function() {
    // Enable timeago plugin for abbr tag with class "timeago".
    $("abbr.timeago").timeago();
});

// noty plugin default options.
$.noty.defaults = {
    layout: 'top',
    theme: 'relax', // or 'relax'
    type: 'alert',
    text: '', // can be html or string
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {
            height: 'toggle'
        }, // or Animate.css class names like: 'animated bounceInLeft'
        close: {
            height: 'toggle'
        }, // or Animate.css class names like: 'animated bounceOutLeft'
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: true, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 3, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click', 'hover'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {},
        onCloseClick: function() {},
    },
    buttons: false // an array of buttons
};

// ChefsHub global namespace.
var CHEFSHUB = {
    User: {
        authentication: {
            loggedIn: false,
            username: null,
            authenticated: false,
        },

        userLogin: function(loginURLRoute, username, password) {
            var jsonLoginData = {
                username: username,
                password: password
            };

            $.ajax({
                type: "POST", // Make a GET request.
                url: loginURLRoute,
                data: jsonLoginData,
                success: function(response) {
                    if (response['error']) {
                        CHEFSHUB.User.userLoginFailure(response['errormsg']);
                    }
                    // Do not do anything on success. Success is handled by HTML page inline script.
                },
            });
        },

        userLoginSuccess: function() {
            if (!Modernizr.localstorage)
                return;

            localStorage.setItem("User.authentication", JSON.stringify(CHEFSHUB.User.authentication));

            noty({
                text: 'Successfully logged in as ' + CHEFSHUB.User.authentication.username + '! <p>Please wait...you will be redirected to the main page.',
                type: 'success',
                timeout: true,
                animation: {
                    open: 'animated bounceInLeft', // Animate.css class names
                    close: 'animated bounceOutLeft', // Animate.css class names
                    easing: 'swing', // unavailable - no need
                    speed: 500 // unavailable - no need
                }
            });
        },

        userLoginFailure: function(errorMessage) {
            noty({
                text: '<span style="color: #000;"> Login Failed! <br>Error Message: ' + errorMessage + '</span>',
                type: 'error',
                timeout: true,
                animation: {
                    open: 'animated bounceInLeft', // Animate.css class names
                    close: 'animated bounceOutLeft', // Animate.css class names
                    easing: 'swing', // unavailable - no need
                    speed: 500 // unavailable - no need
                }
            });
        },

        userRegisterSuccess: function() {
            noty({
                text: 'Successfully registered! You are now being logged in to our system.',
                type: 'success',
                timeout: true,
                animation: {
                    open: 'animated bounceInLeft', // Animate.css class names
                    close: 'animated bounceOutLeft', // Animate.css class names
                    easing: 'swing', // unavailable - no need
                    speed: 500 // unavailable - no need
                }
            });
        },

        userAuthenticationCheck: function() {
            var isAuthenticatedURLRoute = 'http://cp317.ff.gg/api/auth/user/is_authenticated.json';

            $.ajax({
                type: "GET", // Make a GET request.
                url: isAuthenticatedURLRoute,
                success: function(response) {
                    if (response['success']) {
                        $("#verified-user").append('<h4><u>User Verified</u></h4> <p>Logged in as: ' + response['data']['user_data']['username'] + '.');
                    } else {
                        $("#verified-user").append('<h5>User not logged in. <br>Please sign in.</h5>');
                    }
                },
            });
        }
    },

    searchRecipe: function() {
        // Fill recipe-list with recipes matching search result
        // Fill recipe-data with recipe selected
        $(function() {
            $('#recipe-search-form').submit(function(event) {

                // Lock and prevent the default form from actually submitting.
                // Can also return false at the bottom of this function to emulate this however, this is more elegant and proper.
                event.preventDefault();

                // base URL where we will be making HTTP requests to.
                var searchURLRoute = "http://cp317.ff.gg/api/recipe/search.json";
                // var postalCodeSearched = $("input[name='zip']").val();

                $.ajax({
                    type: "POST", // Make a POST request as GET is limited for big data.
                    url: searchURLRoute,
                    data: $("#recipe-search-form").serialize(), // serializes the recipe search form's elements.
                    success: function(response) {
                        console.log(response); // Display the response in an alert.
                    },
                });
            });
        });
    },

    getChefsHubStatistics: function() {
        var statisticsURLRoute = 'http://cp317.ff.gg/api/recipe/statistics.json';
        
        $.ajax({
            type: "GET", // Make a GET request.
            url: statisticsURLRoute,
            success: function(response) {
                if (response['success']) {
                    $("#chefshub-statistics").append('<h5><u>ChefsHub Statistics</u></h5>Users: ' + response['data']['User'] + '. <br>Total Recipes: ' + response['data']['Recipe'] + '.');
                } else {
                    $("#chefshub-statistics").append('<h5>Error fetching statistics.</h5>');
                }
            },
        });
    },

    indexPageFetchDataByCreateTime: function() {
        $(document).on('pageinit', '#home', function() {
            var url = 'http://cp317.ff.gg/api/recipe/get_recent.json/';

            $.ajax({
                url: url,
                dataType: "json",
                async: true,
                success: function(result) {
                    ajax.recipeParseJSON(result);
                },
                error: function(request, error) {
                    alert('Error: We were unable to fetch the data. A network error has occurred please try again!');
                }
            });
        });

        $(document).on('pagebeforeshow', '#headline', function() {
            $('#recipe-data').empty();
            $.each(recipeInfo.result, function(i, row) {
                if (row.id == recipeInfo.id) {
                    $('#recipe-data').append('<img src="http://m.cdn.cp317.ff.gg/' + row.photo + '">');
                    $('#recipe-data').append('<li>Title: <b>' + row.recipe_name + '</b></li>');
                    $('#recipe-data').append('<li>Description: ' + row.description + '</li>');
                    $('#recipe-data').append('<li>Author: ' + row.owner + '</li>');
                    $('#recipe-data').append('<li style="white-space:normal;">Ingredients: <pre>' + row.ingredients + '</pre></li>');
                    $('#recipe-data').append('<li style="white-space:normal;">Directions: <pre>' + row.directions + '</pre></li>');
                    $('#recipe-data').append('<li>Preparation Time: ' + row.prep_time + '</li>');
                    $('#recipe-data').append('<li>Cooking Time: ' + row.cook_time + '</li>');
                    $('#recipe-data').append('<li>Serves: ' + row.serving_value + ' people </li>');
                    $('#recipe-data').append('<li>Rating: ' + row.rating + '/5' + '</li>');
                    $('#recipe-data').append('<li>Difficulty: ' + row.difficulty + '/5' + '</li>');
                    $('#recipe-data').append('<li>Cuisine Type: ' + row.cuisine_type + '</li>');

                    $('#recipe-data').listview('refresh');
                }
            });
        });

        $(document).on('vclick', '#recipe-list li a', function() {
            recipeInfo.id = $(this).attr('data-id');
            $.mobile.changePage("#headline", {
                transition: "slide",
                changeHash: false
            });
        });

        var recipeInfo = {
            id: null,
            result: null
        }

        var ajax = {
            recipeParseJSON: function(result) {
                recipeInfo.result = result['data'];
                $.each(result['data'], function(i, row) {
                    $('#recipe-list').append('<li><a href="" data-id="' + row.id + '"><img src="http://m.cdn.cp317.ff.gg/' + row.photo + '" class="listview-image-centered"/><h3>' + row.recipe_name + '</h3><p class="ui-li-desc">Rating: ' + row.rating + '/5</p><p class=""ui-li-desc">Published: ' + jQuery.timeago(row.meta_date_created) + '</p><p class="ui-li-desc">Author: ' + row.owner + '</p></a></li>');
                });
                $('#recipe-list').listview('refresh');
            }
        }
    }
}