// Initiate firebase
var config = {
    apiKey: "AIzaSyBjnkoINWWrc7OVGEkwWvqM96FZ8OuVQWw",
    authDomain: "group-project-1-e3e12.firebaseapp.com",
    databaseURL: "https://group-project-1-e3e12.firebaseio.com",
    projectId: "group-project-1-e3e12",
    storageBucket: "",
    messagingSenderId: "912831319406"
  };
  firebase.initializeApp(config);

var title;
var genre;
var plot;
var releaseYear;
var type;
var database = firebase.database();


//On Submit click add user input to firebase

$("#submit").on("click", function(event){
	event.preventDefault();

	database.ref().push({
		title:           $("#title").val().trim(),
		plot:            $("#plotLength").val(),
		releaseYear:     $("#releaseYear").val().trim(),
		type:            $("#type").val(),
		genre:           $("#genre").val()
	})
	title                = $("#title").val().trim();
	plot                 = $("#plotLength").val();
	releaseYear          = $("#releaseYear").val().trim();
	type                 = $("#type").val();
	genre                = $("#genre").val();
	var queryUrlOmdb     = "http://www.omdbapi.com/?t=" + title + "&y= " + releaseYear + "&plot=" + plot + "short&apikey=40e9cece";
	var queryUrlGuideBox = "http://api-public.guidebox.com/v2/search?api_key=155b7418532bb36f6fa21cd7eed82f2e1913b798&type=" + type + "&field=title&query=" + title + "&genres=" + genre

	console.log(title);
	console.log(plot);
	console.log(releaseYear);
	console.log(type);
	console.log(genre);

	//Make api calls for user input fields
	
	$.ajax({
		url: queryUrlOmdb,
		method: "GET"
	}).done(function(response){
		console.log(response)
	})

	$.ajax({
	url: queryUrlGuideBox,
	method: "GET"
	}).done(function(response){
		console.log(response)
	})


	title       = $("#title").val("");
	plot        = $("plotLength").val("");
	genre       = $("#genre").val("");
	releaseYear = $("#releaseYear").val("");
	type        = $("#type").val("");

})






/*$.ajax({
	url: queryUrl,
	method: "GET"
}).done(function(response){
	console.log(response)
})

$.ajax({
	url: queryUrl,
	method: "GET"
}).done(function(response){
	console.log(response)
})*/