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
        open: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceInLeft'
        close: {height: 'toggle'}, // or Animate.css class names like: 'animated bounceOutLeft'
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


var CHEFSHUB = {
    User: {
        authentication: {
            loggedIn: false,
            username: null,
            authenticated: false,
        },

        userLoginSuccess: function() {
            if (!Modernizr.localstorage)
                return;

            localStorage.setItem("User.authentication", JSON.stringify(CHEFSHUB.User.authentication));

            noty({
                text: 'Successfully logged in as ' + CHEFSHUB.User.authentication.username + '!',
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
    },

    searchRecipe: function() {
		// Fill recipe-list with recipes matching search result
		// Fill recipe-data with recipe selected
		}

    indexPageFetchDataByCTIME: function() {
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


                    //             $('#recipe-data').append('<li>Popularity : '+row.vote_average+'</li>');             
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
