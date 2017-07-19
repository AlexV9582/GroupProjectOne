$(document).ready(function(){

	//Sets up the sheep audio
	var sheepBah = document.createElement("audio");
	sheepBah.src = "./assets/sounds/Bah.wav";
	sheepBah.autoPlay = false;
	sheepBah.preLoad = true;
	sheepBah.volume = 0.30;

	//Plays the sound and changes the sheep when clicked
	$("#boredSheep").click(function(){

		$("#boredSheep").attr("src", "assets/images/bah_happy.png");
		sheepBah.play();


		setTimeout(function(){

			document.location.href = "newURLHere";

		}, 3000);

	

	});




});