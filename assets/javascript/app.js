var movie = Ice Pirates
var queryURLOmdb = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";



$.ajax({
	url: queryUrlOmdb,
	method: "GET"
}).done(function(response){
	console.log(response)
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