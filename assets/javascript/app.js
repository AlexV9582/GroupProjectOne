// Initiate firebase
var config = {
    apiKey: "AIzaSyBjnkoINWWrc7OVGEkwWvqM96FZ8OuVQWw",
    authDomain: "group-project-1-e3e12.firebaseapp.com",
    databaseURL: "https://group-project-1-e3e12.firebaseio.com",
    projectId: "group-project-1-e3e12",
    storageBucket: "group-project-1-e3e12.appspot.com",
    messagingSenderId: "912831319406"
  };
  firebase.initializeApp(config);

var title;
var plot;
var releaseYear;
var type;
var genre;
var database = firebase.database();
var trailer;
var poster;
var guideBoxResponse;
var omdbResponse;
var youtubeResponse;

//Function to push data to DB
function push(){
	database.ref().push({
		title:             title,
		plotLength:        plotLength,
		releaseYear:       releaseYear,
		type:              type,
		genre:             genre,
		plot:              plot,
		poster:            poster
	})
	
}

//If firebase data exists assign to variables

database.ref().on("value", function(snapshot) {
	if (snapshot.child("title").exists() && snapshot.child("plot").exists() && snapshot.child("releaseYear").exists() && snapshot.child("type").exists() && snapshot.child("genre").exists()) {
		title        = snapshot.val().title;
	    plotLength   = snapshot.val().plotLength;
	    releaseYear  = snapshot.val().releaseYear;
	    type         = snapshot.val().type;
   	    genre        = snapshot.val().genre;
   	    plot         = snapshot.val().plot;
   	    poster       = snapshot.val().poster
   	}
})
//On Submit click add user input to firebase

$("#submit").on("click", function(event){
	event.preventDefault();

	title                  = $("#title").val().trim();
	plotLength             = $("#plotLength").val();
	releaseYear            = $("#releaseYear").val().trim();
	type                   = $("#type").val();
	genre                  = $("#genre").val();
	var queryUrlOmdb       = "https://www.omdbapi.com/?t=" + title + "&y= " + releaseYear + "&plot=" + plotLength + "&apikey=40e9cece";
	var queryUrlGuideBox   = "https://api-public.guidebox.com/v2/search?api_key=155b7418532bb36f6fa21cd7eed82f2e1913b798&type=" + type + "&field=title&query=" + title + "&genres=" + genre	

	//console.log(title);
	//console.log(plotLength);
	//console.log(releaseYear);
	//console.log(type);
	//console.log(genre);

	//Make api calls for user input fields
	
	$.ajax({
		url: queryUrlOmdb,
		method: "GET"
	}).done(function(omdbResponse){
		//console.log(response)
		plot        = omdbResponse.Plot
		genre       = omdbResponse.Genre
		releaseYear = omdbResponse.Released
		type        = omdbResponse.Type
		title       = omdbResponse.Title
		$("#description").html(plot)
		//console.log("plot: " + plot)
		//console.log(title)
		push()
	})
	$(document).ajaxError(function(e, xhr, opt){
		        alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		    });

	$.ajax({
	url: queryUrlGuideBox,
	method: "GET"
	}).done(function(guideBoxResponse){
		console.log("GuideBox:")
		console.log(guideBoxResponse)
		poster = guideBoxResponse.results[0].poster_400x570
		$("#poster").attr("src", guideBoxResponse.results[0].poster_400x570)
		push()
	})
	$(document).ajaxError(function(e, xhr, opt){
	        alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
	    });
	var queryUrlYouTube    = "https://www.googleapis.com/youtube/v3/search";
	var query = title + " trailer";

	$.ajax({
		url: queryUrlYouTube,
		method: "GET",
		data: {
			key: "AIzaSyDQ8Tst3v2WmurGUFrLdEYyd1EibjkDb6c",
			q: query,
			maxResults: 10,
			part: "snippet"
		}
	}).done(function(youtubeResponse){
			console.log("YouTube:");
			console.log(youtubeResponse);
			$("#movieTrailer").attr("src", "https://www.youtube.com/embed/" + youtubeResponse.items[0].id.videoId);
	})
		$(document).ajaxError(function(e, xhr, opt){
		        alert("Error requesting " + opt.url + ": " + xhr.status + " " + xhr.statusText);
		    });
	

	$("#title").val("");
	$("#releaseYear").val("");
})

//Add data to table
database.ref().limitToLast(10).on("child_added", function(snapshot){
	var sv = snapshot.val();
	//console.log("sv: ");
	
	//sv.title = '"bob"'
	var convertedTitle = sv.title.replace(/"/g, '&quot')
	console.log(convertedTitle)

	$("tbody").append($('<tr><td>' + sv.title + '</td><td>' + sv.plot + '</td><td>' + sv.releaseYear + '</td><td>' + sv.genre + 
		'</td><td>' + sv.type + '</td><td><button type="button" data-toggle="modal" data-target="#Trailer" class="trailer" data-title="'+ convertedTitle + '">Trailer</button></td></tr>'))
	console.log(sv.title)
	$(".table").on("click", ".trailer", (function(){
	//	$("#Trailer").modal("show")
	//change trailer from id to class on button and click listener
		var titleHeader = $(this).attr("data-title")
		console.log(titleHeader)
		$(".modal-title").html(titleHeader);
		

	}))
})










