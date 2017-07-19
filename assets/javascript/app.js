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
		title:       $("#title").val().trim(),
		genre:       $("#genre").val().trim(),
		releaseYear: $("#releaseYear").val().trim(),
		type:        $("#type").val().trim()
	})
	title       = $("#title").val().trim();
	genre       = $("#genre").val().trim();
	releaseYear = $("#releaseYear").val().trim();
	type        = $("#type").val().trim();
	var queryUrlOmdb = "http://www.omdbapi.com/?t=" + title + "&y= " + releaseYear + "&plot=short&apikey=40e9cece";
	//Make api call to omdb for user input fields
	
	$.ajax({
		url: queryUrlOmdb,
		method: "GET"
	}).done(function(response){
		console.log(response)
	})

	title       = $("#title").val("");
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
})

$.ajax({
	url: queryUrl,
	method: "GET"
}).done(function(response){
	console.log(response)
})*/