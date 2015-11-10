

function getParams() {

    var params = {},
        pairs = document.URL.split('?')
               .pop()
               .split('&');

    for (var i = 0, p; i < pairs.length; i++) {
        p = pairs[i].split('=');
        params[p[0]] = p[1];
    }

    return params;
}


var params = getParams();

console.log(params['id']);


$(function () {

    // to display loading gif.....

    // -------------------------------------------

    $(document).ajaxStart(function () {
        $("#loading").show().css({

            "height": "55px",

            "width": "55px",

            "position": "relative",

            "left": "43%",

            "opacity": "1"
        });
    }).ajaxStop(function () {

        $("#loading").hide();
    });

    // -------------------------------------------

    $("input[type='text']").keyup(function () {

        $(this).css({

            'font-size': '20px'

        });

    });


    // Rotten tomatoes SEARCH FUNCTIONALITY


    $("#search").keypress(function (e) {


        if (e.which == "13") {


            var movie_title = $("#search").val();

            console.log(movie_title);

            if (movie_title = "") {

                alert("please enter valid movie title");
            }

            else {


                function getData() {
                    // console.log("getMovieData for page = " + page);

                    //var movieurl = makeUrl();

                    var settings = {
                        apikey: "kas6vr9cz8ugnjnpbxxhksgc",
                        q: $("#search").val(),
                        page_limit: "25"
                    }

                    $.ajax({
                        type: "GET",
                        url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                        data: settings,
                        dataType: "jsonp",
                        error: function (jqXHR, status, error) {
                            console.log(error);
                        },
                        success: getDataSuccess
                    });

                }

                getData();

                function getDataSuccess(data) {

                    // SEARCH MOVIES DISPLAY

                    console.log(data);

                    var movies = data.movies;

                    if (movies == "") {

                        alert("Please enter valid movie name");
                    }
                    else {

                        $("#mov").empty();

                        $(".moviedetails").empty();


                        $.each(movies, function (i, v) {

                            var id = v.id;

                            var posters = v.posters;

                            var thumbnail = posters.thumbnail;

                            var hd_url = thumbnail.split("/dkpu1ddg7pbsk.cloudfront.net/");

                            var new_url = hd_url[1];

                            console.log(new_url);

                            var div_img = $("<div>").attr('id', id).addClass("img").appendTo("#mov").css({

                                "float": "left",
                                "margin-top": "15px",
                                "margin": "10px",
                                "border-width": "2px",
                                "border-color": "#000000",
                                "border-radius": "25px"

                            });


                            if (new_url == undefined) {


                                $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                                    "height": "170px",
                                    "width": "130px",
                                    "cursor": "pointer",
                                    "border-width": "2px",
                                    "border-color": "#000000",
                                    "border-radius": "25px"
                                });
                            }

                            else {

                                var hd_posters_url = "http://content6.flixster.com/" + new_url;


                                if (hd_posters_url == "") {
                                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                                        "height": "170px",
                                        "width": "130px",
                                        "cursor": "pointer",
                                        "border-width": "2px",
                                        "border-color": "#000000",
                                        "border-radius": "25px"
                                    });

                                } // end of if
                                else {
                                    $("<img>").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({


                                        "height": "170px",
                                        "width": "130px",
                                        "cursor": "pointer",
                                        "border-width": "2px",
                                        "border-color": "#000000",
                                        "border-radius": "25px"

                                    });

                                }
                            }

                            var className = $("#" + id).attr('id');

                            //console.log(className);


                            $("#" + id).css({

                                "cursor": "pointer"

                            }).click(function () {

                                console.log("success from click")

                                movieInfo(className);

                            });

                        });
                    }

                    function movieInfo(className) {

                        console.log(className);

                        window.location.href = 'Moviedetailsinfo.html?id=' + className;
                    }
                } // end of getDataSuccess


                function getDataFailure() {

                    alert("failed to get data");
                }

            }
        }
    }); // end of // Rotten tomatoes SEARCH FUNCTIONALITY 

    $("#search_img").click(function () {

        var movie_title = $("#search").val();

        console.log(movie_title);

        if (movie_title = "") {

            alert("please enter valid movie title");
        }

        else {


            function getData() {
                // console.log("getMovieData for page = " + page);

                //var movieurl = makeUrl();

                var settings = {
                    apikey: "kas6vr9cz8ugnjnpbxxhksgc",
                    q: $("#search").val(),
                    page_limit: "25"
                }

                $.ajax({
                    type: "GET",
                    url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json",
                    data: settings,
                    dataType: "jsonp",
                    error: function (jqXHR, status, error) {
                        console.log(error);
                    },
                    success: getDataSuccess
                });

            }

            getData();

            function getDataSuccess(data) {

                // SEARCH MOVIES DISPLAY

                console.log(data);

                var movies = data.movies;

                if (movies == "") {

                    alert("Please enter valid movie name");
                }
                else {

                    $("#mov").empty();

                    $(".moviedetails").empty();


                    $.each(movies, function (i, v) {

                        var id = v.id;

                        var posters = v.posters;

                        var thumbnail = posters.thumbnail;

                        var hd_url = thumbnail.split("/dkpu1ddg7pbsk.cloudfront.net/");

                        var new_url = hd_url[1];

                        console.log(new_url);

                        var div_img = $("<div>").attr('id', id).addClass("img").appendTo("#mov").css({

                            "float": "left",
                            "margin-top": "15px",
                            "margin": "10px",


                        });


                        if (new_url == undefined) {


                            $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                                "height": "170px",
                                "width": "130px",
                                "cursor": "pointer",
                                "border-width": "2px",
                                "border-color": "#000000",
                                "border-radius": "25px"
                            });
                        }

                        else {

                            var hd_posters_url = "http://content6.flixster.com/" + new_url;


                            if (hd_posters_url == "") {
                                $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                                    "height": "170px",
                                    "width": "130px",
                                    "cursor": "pointer",
                                    "border-width": "2px",
                                    "border-color": "#000000",
                                    "border-radius": "25px"
                                });

                            } // end of if
                            else {
                                $("<img>").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({


                                    "height": "170px",
                                    "width": "130px",
                                    "cursor": "pointer",
                                    "border-width": "2px",
                                    "border-color": "#000000",
                                    "border-radius": "25px"

                                });

                            }
                        }

                        var className = $("#" + id).attr('id');

                        //console.log(className);


                        $("#" + id).css({

                            "cursor": "pointer"

                        }).click(function () {

                            console.log("success from click")

                            movieInfo(className);

                        });

                    });
                }
            } // end of getDataSuccess
        }

        function getDataFailure() {

            alert("failed to get data");
        }

    }); // end of search click


    function tog(v) { return v ? 'addClass' : 'removeClass'; }

    $(document).on('input', '#search', function () {
        $(this)[tog(this.value)]('x');
    }).on('mousemove', '.x', function (e) {
        $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
    }).on('click', '.onX', function () {
        $(this).removeClass('x onX').val('').change();
    });

    var rottenTomotoesMovieLink = "http://api.rottentomatoes.com/api/public/v1.0/movies/" + params['id'] + ".json?apikey=kas6vr9cz8ugnjnpbxxhksgc";


    var $moviename;

    function makeMovieUrl() {

        var movieurl = "simpleproxy.aspx?url=|"
            + rottenTomotoesMovieLink
            + "|";

        return movieurl;
    }


    function getMovieData() {
        // console.log("getMovieData for page = " + page);

        var movieurl = makeMovieUrl();

        var settings = {
            url: movieurl,
            dataType: "json",
            cache: false
        };

        $.ajax(settings)
            .done(getMovieDataSuccess)
            .fail(getMovieDataFailure);
    }

    getMovieData();

    function getMovieDataSuccess(data) {

        console.log(data);

        var posters = data.posters;

        var thumbnail = posters.thumbnail;

        var hd_url = thumbnail.split("/dkpu1ddg7pbsk.cloudfront.net/");

        var new_url = hd_url[1];

        console.log(new_url);

        if (new_url == undefined) {

            var hd_posters_url = "";


            var title = data.title;

            var urlPoster = hd_posters_url;

            console.log(urlPoster);

            var ratings = data.ratings;

            var aud_rating = ratings.audience_score;

            var cri_rating = ratings.critics_score;

            var plot = data.synopsis;

            var actors = data.abridged_cast;

            var div_img = $("<div>").addClass("moviedetails").appendTo("#movietotaldetails").css({

                "margin-top": "15px",
                "margin": "10px",
                "border-width": "2px",
                "border-color": "black",
                "border-radius": "25px"
            });


            if (plot == "") {

                $("<img />").attr("src", "../images/my_images/poster_default_thumb.jpeg").appendTo(div_img).css({

                    "class": "moviedetails",
                    "float": "left",
                    "margin-right": "50px",
                    "height": "165px",
                    "width": "125px",
                });

                div_title = $("<div>").addClass("moviedetails").append(title).appendTo(div_img).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "40px",
                });

                div_plot_heading = $("<div> Plot: </div>").appendTo(div_title).css({

                    "font-size": "30px",
                })

                div_plot = $("<div>").addClass("moviedetails").append("Oops! Plot not found").appendTo(div_title).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "20px"
                });

                div_rating_heading = $("<div>  Rating: </div>").append(aud_rating + "/100").appendTo(div_plot).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "30px",

                });

                var cast = $("<div>Cast:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",

                });

                var actors_div = $("<div>Actors</div>").append("<br/>").appendTo(cast).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "20px",
                });

                $.each(actors, function (i, v) {

                    console.log(v);

                    var actor_name = v.name;

                    var characters = v.characters;

                    var div_act_name = $("<div>").attr('class', 'actors').append(actor_name).appendTo(actors_div).css({

                        "float": "left",
                        "margin": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "25px"
                    });


                    var div_act_img = $("<div>").attr('class', 'actors').appendTo(div_act_name);

                    $("<img />").attr("src", "../images/my_images/image-not-found.jpg").appendTo(div_act_img).attr('class', 'actors').css({

                        "margin": "10px",
                        "height": "80px",
                        "width": "60px"
                    });


                });
            }

            else {


                if (urlPoster == "") {
                    $("<img />").attr("src", "../images/my_images/poster_default_thumb.jpeg").appendTo(div_img).css({

                        "float": "left",
                        "margin-right": "30px",
                        "height": "165px",
                        "width": "125px"
                    });
                } // end of if
                else {
                    $("<img />").attr("src", urlPoster).appendTo(div_img).css({

                        "class": "moviedetails",
                        "float": "left",
                        "margin-right": "50px",
                        "height": "165px",
                        "width": "125px",
                    });
                }// end of else
                div_title = $("<div>").addClass("moviedetails").append(title).appendTo(div_img).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "40px",
                });

                div_plot_heading = $("<div> Plot: </div>").appendTo(div_title).css({

                    "font-size": "30px",
                    "margin-top": "27px",
                })

                div_plot = $("<div>").addClass("moviedetails").append(plot).appendTo(div_title).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "20px"
                });

                div_rating_heading = $("<div>  Rating: </div>").append(aud_rating + "/100").appendTo(div_plot).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "20px",
                    "font-size": "30px",

                });

                var cast = $("<div>Cast:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "60px"

                });

                var actors_div = $("<div>Actors</div>").append("<br/>").appendTo(cast).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "20px",
                });

                $.each(actors, function (i, v) {

                    console.log(v);

                    var actor_name = v.name;

                    var characters = v.characters;

                    var div_act_name = $("<div>").attr('class', 'actors').append(actor_name).appendTo(actors_div).css({

                        "float": "left",
                        "margin": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "25px"
                    });


                    var div_act_img = $("<div>").attr('class', 'actors').appendTo(div_act_name);

                    $("<img />").attr("src", "../images/my_images/image-not-found.jpg").appendTo(div_act_img).attr('class', 'actors').css({

                        "margin": "10px",
                        "height": "80px",
                        "width": "60px"
                    });

                });


            }
        }

        else {

            var hd_posters_url = "http://content6.flixster.com/" + new_url;


            var title = data.title;

            var urlPoster = hd_posters_url;

            console.log(urlPoster);

            var ratings = data.ratings;

            var aud_rating = ratings.audience_score;

            var cri_rating = ratings.critics_score;

            var plot = data.synopsis;

            var actors = data.abridged_cast;

            var directors = data.abridged_directors;

            var genre = data.genres;

            console.log(directors);

            var div_img = $("<div>").addClass("moviedetails").appendTo("#movietotaldetails").css({

                "margin-top": "15px",
                "margin": "10px",
                "border-width": "2px",
                "border-color": "black",
                "border-radius": "25px"
            });


            if (plot == "") {

                $("<img />").attr("src", urlPoster).appendTo(div_img).css({

                    "class": "moviedetails",
                    "float": "left",
                    "margin-right": "50px",
                    "height": "165px",
                    "width": "125px",
                });

                div_title = $("<div>").addClass("moviedetails").append(title).appendTo(div_img).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "40px",
                });

                div_plot_heading = $("<div> Plot: </div>").appendTo(div_title).css({

                    "font-size": "30px",
                })

                div_plot = $("<div>").addClass("moviedetails").append("Oops! Plot not found").appendTo(div_title).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "20px"
                });

                div_rating_heading = $("<div>  Rating: </div>").append(aud_rating + "/100").appendTo(div_plot).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "30px",

                });

                var genre_div = $("<div>Genre:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "10px",
                });


                $.each(genre, function (i, v) {

                    console.log(v);

                    var div_genre_name = $("<div>").attr('class', 'actors').append(v).appendTo(genre_div).css({

                        "margin-top": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "20px"
                    });
                });

                var cast = $("<div>Cast:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",

                });

                var director_div = $("<div> 1. Director</div>").append("<br/>").appendTo(cast).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "20px",
                });

                $.each(directors, function (i, v) {

                    console.log(v);

                    name = v.name;

                    console.log(name);

                    var div_drt_name = $("<div>").attr('class', 'actors').append(name).appendTo(director_div).css({

                        "margin-top": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "20px"
                    });




                    var actors_div = $("<div> 2. Actors:</div>").appendTo(div_drt_name).css({

                        "font-family": "'Lobster', cursive",
                        "margin-top": "30px",
                        "font-size": "28px",
                        "margin-bottom": "20px",
                    });

                    $.each(actors, function (i, v) {

                        console.log(v);

                        var actor_name = v.name;

                        var characters = v.characters;

                        var div_act_name = $("<div>").attr('class', 'actors').append(actor_name).appendTo(actors_div).css({

                            "margin-top": "10px",
                            "font-family": "'Lobster', cursive",
                            "font-size": "20px"
                        });

                    }); // end of actors


                });
            } // end of if plot == ""

            else {


                if (urlPoster == "") {
                    $("<img />").attr("src", "../images/my_images/poster_default_thumb.jpeg").appendTo(div_img).css({

                        "float": "left",
                        "margin-right": "30px",
                        "height": "165px",
                        "width": "125px"
                    });
                } // end of if
                else {
                    $("<img />").attr("src", urlPoster).appendTo(div_img).css({

                        "class": "moviedetails",
                        "float": "left",
                        "margin-right": "50px",
                        "height": "165px",
                        "width": "125px",
                    });
                }// end of else
                div_title = $("<div>").addClass("moviedetails").append(title).appendTo(div_img).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "40px",
                });

                div_plot_heading = $("<div> Plot: </div>").appendTo(div_title).css({

                    "font-size": "30px",
                    "margin-top": "27px",
                })

                div_plot = $("<div>").addClass("moviedetails").append(plot).appendTo(div_title).css({

                    "font-family": "'Lobster', cursive",
                    "font-size": "20px"
                });

                div_rating_heading = $("<div>  Rating: </div>").append(aud_rating + "/100").appendTo(div_plot).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "20px",
                    "font-size": "30px",

                });

                var genre_div = $("<div>Genre:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "10px",
                });


                $.each(genre, function (i, v) {

                    console.log(v);

                    var div_genre_name = $("<div>").attr('class', 'actors').append(v).appendTo(genre_div).css({

                        "margin-top": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "20px"
                    });
                });

                var cast = $("<div>Cast:</div>").appendTo(div_rating_heading).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "40px"

                });

                

                var director_div = $("<div> 1. Director</div>").append("<br/>").appendTo(cast).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "20px",
                });

                $.each(directors, function (i, v) {

                    console.log(v);

                    name = v.name;

                    console.log(name);

                    var div_drt_name = $("<div>").attr('class', 'actors').append(name).appendTo(director_div).css({

                        "margin-top": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "20px"
                    });
                

                

                var actors_div = $("<div> 2. Actors:</div>").appendTo(div_drt_name).css({

                    "font-family": "'Lobster', cursive",
                    "margin-top": "30px",
                    "font-size": "28px",
                    "margin-bottom": "20px",
                });

                $.each(actors, function (i, v) {

                    console.log(v);

                    var actor_name = v.name;

                    var characters = v.characters;

                    var div_act_name = $("<div>").attr('class', 'actors').append(actor_name).appendTo(actors_div).css({

                        "margin-top": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "20px"
                    });

                }); // end of actors

               

              }); // end of directors
            }
        }
    }

    function getMovieDataFailure() {

        alert("Failed to get movie data");
    }

});

