$(function () {

    // to display loading gif.....

    // -------------------------------------------

    $(document).ajaxStart(function () {
        $("#loading").show().css({

            "height": "55px",

            "width" : "55px",

            "position": "relative",

            "left": "43%",

            "opacity" : "1"
        });
    }).ajaxStop(function(){
    
        $("#loading").hide();
    });

    // -------------------------------------------

    // BoxOffice movies Functionality

    var rottenTomotoesMovieLink = "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey=kas6vr9cz8ugnjnpbxxhksgc";

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
                .fail(getMovieDataFailure);
    }

    getMovieData();

    function getMovieDataSuccess(data) {

        movies = data.movies;

        var boxoffice = $("#boxoffice").css({

            "float" : "left"        
        });

        var div_top_box_office_movies = $("<div>TOP BOX OFFICE MOVIES</div>").appendTo(boxoffice)
                                        .css({

                                            "font-family": "'Lobster', cursive",
                                            "color": "#E5C100",
                                            "font-size": "30px",
                                            
                                        }); 

        // BOX OFFICE MOVIES DISPLAY
        $.each(movies, function (i, v) {

            var id = v.id;

            var posters = v.posters;

            var thumbnail = posters.thumbnail;

            var hd_url = thumbnail.split("/dkpu1ddg7pbsk.cloudfront.net/");

            var new_url = hd_url[1];

            if (new_url == undefined) {

                var hd_posters_url = "";

                var div_img = $("<div>").attr('id', id).addClass("img").appendTo(div_top_box_office_movies).css({

                    "float": "left",
                    "margin": "10px",
                    "margin-top": "15px"

                });

                if (hd_posters_url == "") {
                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "170px",
                        "width": "130px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"
                    });
                } // end of if
                else {
                    $("<img>").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "170px",
                        "width": "130px",
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
            } // end of if

            else {

                var hd_posters_url = "http://content6.flixster.com/" + new_url;

                var div_img = $("<div>").attr('id', id).addClass("img").appendTo(boxoffice).css({

                    "float": "left",
                    "margin": "10px",
                    "margin-top": "15px"

                });

                if (hd_posters_url == "") {
                    $("<img>").attr("src", "../images/my_images/poster_default_thumb.jpeg").attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "130px",
                        "width": "130px",
                        "cursor": "pointer",
                        "border": "solid",
                        "border-width": "2px",
                        "border-color": "black",
                        "border-radius": "25px"
                    });
                } // end of if
                else {
                    $("<img>").attr("src", hd_posters_url).attr('id', id).appendTo(div_img).addClass("bom").css({

                        "height": "160px",
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


            } // end of else
        });

        // BOX OFFICE MOVIES DISPLAY
    } // END OF getMovieDataSuccess

      function movieInfo(className) {
  
          console.log(className);
  
          window.location.href = 'Moviedetailsinfo.html?id=' + className;
      } 
   
    function getMovieDataFailure() {

        alert("Failed to get movie data");
    }

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

                        $("#boxoffice").empty();


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

                    $("#boxoffice").empty();


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
   
  
    $("#search").keyup(function () {

        if ($(this).val() !== '') {
            $(this).css('font-size', '20px')
        } else {
            $(this).css('font-size', '20px')
        }

    });

function tog(v) { return v ? 'addClass' : 'removeClass'; }

$(document).on('input', '#search', function () {
    $(this)[tog(this.value)]('x');
}).on('mousemove', '.x', function (e) {
    $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
}).on('click', '.onX', function () {
    $(this).removeClass('x onX').val('').change();
});

}); // END OF MAIN JQUERY

function showMovieInfo(className) {

    console.log(className);

    window.location.href = 'Movieinformation.html?id=' + className;

}

function renderMoviesFailure(){

    alert("Please enter valid title");

    
} 
