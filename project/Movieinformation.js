
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

    
   

    function tog(v) { return v ? 'addClass' : 'removeClass'; }

    $(document).on('input', '#search', function () {
        $(this)[tog(this.value)]('x');
    }).on('mousemove', '.x', function (e) {
        $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
    }).on('click', '.onX', function () {
        $(this).removeClass('x onX').val('').change();
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
   
});



