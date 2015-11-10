$(function () {

    // Opening movies Functionality

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

    var rottenTomotoesMovieLink = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/opening.json?apikey=zv998dvdav53ajkwxm679s5f";

    var limit = "&limit=25";

    function makeMovieUrl() {

        var movieurl = "simpleproxy.aspx?url=|"
            + rottenTomotoesMovieLink
            + limit
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
            .fail(function (xhr, textStatus, errorThrown) {
                alert(xhr.responseText);
                console.log(errorThrown);
            });
    }

    getMovieData();

    function getMovieDataSuccess(data) {

        movies = data.movies;

        console.log(movies);

        // OPENING MOVIES DISPLAY
        $.each(movies, function (i, v) {

            var id = v.id;

            var posters = v.posters;

            var thumbnail = posters.thumbnail;

            var hd_url = thumbnail.split("/dkpu1ddg7pbsk.cloudfront.net/");

            var new_url = hd_url[1];

            var div_img = $("<div>").attr('id', id).addClass("img").appendTo("#om").css({

                "float": "left",
                "margin": "10px",
                "margin-top": "15px"

            });

            if (new_url == undefined) {

                var hd_posters_url = "";

                if (hd_posters_url == "") {
                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "165px",
                        "width": "125px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"
                    });
                } // end of if
                else {
                    $("<img>").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "165px",
                        "width": "125px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"
                    });
                }

                var className = $("#" + id).attr('id');

                //console.log(className);


                $("#" + id).css({

                    "cursor": "pointer"

                }).click(function () {

                    console.log("success from click")

                    movieInfo(className);

                });
            } // end of main if

            else {

                var hd_posters_url = "http://content6.flixster.com/" + new_url;


                if (hd_posters_url == "") {
                    $("<img />").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "165px",
                        "width": "125px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"
                    });
                } // end of if
                else {
                    $("<img />").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "165px",
                        "width": "125px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"

                    });
                }

                var className = $("#" + id).attr('id');

                //console.log(className);


                $("#" + id).css({

                    "cursor": "pointer"

                }).click(function () {

                    console.log("success from click")

                    movieInfo(className);

                });
            }
            });
            // END OF OPENING MOVIES DISPLAY

    }


        
    function movieInfo(className) {

        console.log(className);

        window.location.href = 'Moviedetailsinfo.html?id=' + className;
    }

    function getMovieDataFailure() {

        alert("Failed to get movie data");
    }


    // search functionality

    $("input[type='text']").keyup(function () {

        $(this).css({

            'font-size': '20px'

        });


    });

    

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

                        $("#om").empty();


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

                    $("#om").empty();


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
    
});
            
        

function renderMovies(movies) {

    console.log(movies);

    if (movies == "") {

        alert("Please enter valid movie name");
    }


    else{
    
        $("#topmovies").empty();

        $("#mov").empty();

    $.each(movies, function (i, v) {

        console.log(v);

        var title = v.title;
        var urlPoster = v.urlPoster;
        var idIMDB = v.idIMDB;
        var plot = v.plot;
        var emptyplot = "";

        console.log(plot);

        if (plot == "") {

            console.log("entered if successfully");

            movies_with_plot = $.grep(v, function (value) {
                return value != emptyplot;
            });

            console.log(movies_with_plot);


            $.each(movies_with_plot, function (index, value) {

                console.log("setting to - " + idIMDB);

                var div_title = $("<div>").append(title).appendTo("#mov")
                        .attr('class', idIMDB)
                        .css({

                            "float": "left",
                            "margin": "10px",
                            "font-family": "'Lobster Two', cursive",
                            "font-size": "30px",
                            "color": "#880000"
                        });

                var div_img = $("<div>").attr('class', idIMDB).appendTo(div_title).css({

                    "float": "left",
                    "border-width": "2px",
                    "border-color": "#E5C100",
                    "border-radius": "25px"
                });

                if (urlPoster == "") {
                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('class', idIMDB).appendTo(div_img).css({

                        "float": "left",
                        "margin": "10px",
                        "height": "165px",
                        "width": "125px",
                        "border": "solid",
                        "border-width": "2px",
                        "border-radius": "25px",
                        "border-color": "#000000"
                    });
                } // end of if
                else {
                    $("<img>").attr("src", urlPoster).attr('class', idIMDB).appendTo(div_img).css({

                        "float": "left",
                        "margin": "10px",
                        "height": "165px",
                        "width": "125px",
                        "border": "solid",
                        "border-width": "2px",
                        "border-radius": "25px",
                        "border-color": "#000000"
                    });
                }

                var div_top_movies = $("<div>TOP IMDB MOVIES</div>").append("<body>").css({

                    "border-style": "dashed",
                    "border-width": "3px"

                });

                var className = $("." + idIMDB).attr('class');

                console.log(className);

                $("." + idIMDB).css({

                    "cursor": "pointer"

                }).click(function () {


                    showMovieInfo(className);

                });

            }); // end of nested for each

        } // end of main if  

        else {

            console.log("setting to - " + idIMDB);

            var div_title = $("<div>").append(title).appendTo("#mov")
                    .attr('class', idIMDB)
                    .css({

                        "float": "left",
                        "margin": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "30px",
                        "color": "#000000"
                    });

            var div_img = $("<div>").attr('class', idIMDB).appendTo(div_title);

            if (urlPoster == "") {
                $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('class', idIMDB).appendTo(div_img).css({

                    "float": "left",
                    "margin": "10px",
                    "height": "165px",
                    "width": "125px",
                    "border": "solid",
                    "border-width": "2px",
                    "border-radius": "25px",
                    "border-color": "#000000"
                });
            } // end of if
            else {
                $("<img>").attr("src", urlPoster).attr('class', idIMDB).appendTo(div_img).css({

                    "float": "left",
                    "margin": "10px",
                    "height": "165px",
                    "width": "125px",
                    "border": "solid",
                    "border-width": "2px",
                    "border-radius": "25px",
                    "border-color": "#000000"
                });
            }

            var className = $("." + idIMDB).attr('class');

            console.log(className);

            $("." + idIMDB).css({

                "cursor": "pointer"

            }).click(function () {


                showMovieInfo(className);

            });


        } // end of main else
    }); // end of for each
} // end of else
} // end of renderMovies


function myapifilms(movies) {

    console.log(movies);
    $.each(movies, function (i, v) {

        console.log(v);

        var title = v.title;
        var urlPoster = v.urlPoster;
        var idIMDB = v.idIMDB;
        var plot = v.plot;
        var emptyplot = "";

        console.log(urlPoster);

        if (plot == "") {

            console.log("entered if successfully");

            movies_with_plot = $.grep(v, function (value) {
                return value != emptyplot;
            });

            console.log(movies_with_plot);


            $.each(movies_with_plot, function (index, value) {

                console.log("setting to - " + idIMDB);

                var div_title = $("<div>").append(title).appendTo("#mov")
                        .attr('class', idIMDB)
                        .css({

                            "float": "left",
                            "margin": "10px",
                            "font-family": "'Lobster', cursive",
                            "font-size": "21px"
                        });

                var div_img = $("<div>").attr('class', idIMDB).appendTo(div_title);

                if (urlPoster == "") {
                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('class', idIMDB).appendTo(div_img).css({

                        "float": "left",
                        "margin": "10px",
                        "height": "165px",
                        "width": "125px"
                    });
                } // end of if
                else {
                    $("<img>").attr("src", urlPoster).attr('class', idIMDB).appendTo(div_img).css({

                        "float": "left",
                        "margin": "10px",
                        "height": "165px",
                        "width": "125px",
                    });
                }

                var className = $("." + idIMDB).attr('class');

                console.log(className);

                $("." + idIMDB).css({

                    "cursor": "pointer"

                }).click(function () {


                    showMovieInfo(className);

                });

            }); // end of nested for each

        } // end of main if  

        else {

            console.log("setting to - " + idIMDB);

            var div_title = $("<div>").append(title).appendTo("#topmovies")
                    .attr('class', idIMDB)
                    .css({

                        "float": "left",
                        "margin": "10px",
                        "font-family": "'Lobster', cursive",
                        "font-size": "21px"
                    });

            var div_img = $("<div>").attr('class', idIMDB).appendTo(div_title);

            if (urlPoster == "") {
                $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('class', idIMDB).appendTo(div_img).css({

                    "float": "left",
                    "margin": "10px",
                    "height": "165px",
                    "width": "125px",
                    "border": "solid",
                    "border-width": "2px",
                    "border-color": "#000000",
                    "border-radius": "25px"
                });
            } // end of if
            else {
                $("<img>").attr("src", urlPoster).attr('class', idIMDB).appendTo(div_img).css({

                    "float": "left",
                    "margin": "10px",
                    "height": "180px",
                    "width": "130px",
                    "border": "solid",
                    "border-width": "2px",
                    "border-color": "#000000",
                    "border-radius": "25px"
                });
            }

            var className = $("." + idIMDB).attr('class');

            console.log(className);

            $("." + idIMDB).css({

                "cursor": "pointer"

            }).click(function () {


                showMovieInfo(className);

            });


        } // end of main else
    }); // end of for each
} // end of myapifilms


function showMovieInfo(className) {

    console.log(className);

    window.location.href = 'Movieinformation.html?id=' + className;

}

function renderMoviesFailure() {

    alert("Please enter valid title");


}
