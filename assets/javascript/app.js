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

//Function to push data to DB
function push(){
	database.ref().push({
		title:             title,
		plotLength:        plotLength,
		releaseYear:       releaseYear,
		type:              type,
		genre:             genre,
		plot:              plot
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

	console.log(title);
	console.log(plotLength);
	console.log(releaseYear);
	console.log(type);
	console.log(genre);

	//Make api calls for user input fields

	
	$.ajax({
		url: queryUrlOmdb,
		method: "GET"
	}).done(function(response){
		console.log(response)
		plot = response.Plot
		releaseYear = response.Released
		console.log("plot: " + plot)
		console.log(title)
		push()
	})

	$.ajax({
	url: queryUrlGuideBox,
	method: "GET"
	}).done(function(response){
		console.log("GuideBox: " + response)
	})

	var queryUrlYouTube    = "https://www.googleapis.com/youtube/v3/search";
	var query = title + "trailer";

	$.ajax({
		url: queryUrlYouTube,
		method: "GET",
		data: {
			key: "AIzaSyDQ8Tst3v2WmurGUFrLdEYyd1EibjkDb6c",
			q: query,
			maxResults: 10,
			part: "snippet"
		}
	}).done(function(response){
			console.log("YouTube: " + response)
	})
	

	$("#title").val("");
	$("#releaseYear").val("");
})

//Add data to table
database.ref().limitToLast(10).on("child_added", function(snapshot){
	var sv = snapshot.val();
	console.log("sv: ");
	$("tbody").append($("<tr><td>" + sv.title + "</td><td>" + sv.plot + "</td><td>" + sv.releaseYear + "</td><td>" + sv.genre + "</td><td>" + sv.type + "</td><td><button type='submit'>Trailer</button></td></tr>"))
})





