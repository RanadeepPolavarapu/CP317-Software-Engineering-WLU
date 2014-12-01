// Shorthand for $( document ).ready()
$(function() {
	// Enable timeago plugin for abbr tag with class "timeago".
    $("abbr.timeago").timeago();
});


var CHEFSHUB = {
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
                    alert('Network error has occurred please try again!');
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
                    $('#recipe-data').append('<li>Serves: ' + row.serving_value + 'people </li>');
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