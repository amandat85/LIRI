//Get the dotenv node modules
require("dotenv").config();

//Require keys that store spotify keys from .env
const keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);//What is this?
let axios = require("axios");
let moment = require("moment");
let inquirer = require("inquirer")
let fs = require("fs");

let command = process.argv[2];//concert-this, spotify-this-song, movie-this, do-what-it-say - use inquirer
let search = process.argv[3]; //what the user is searching

//Add searching titles and songs with multiple words??

//BANDS IN TOWN SEARCH ===========================================================================
let bandSearch = (search) => {
	axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
		.then(function (response) {
			for (var i = 0; i < response.data.length; i++) {
				let concertResults = "--------------------------------------------------------------------" +
					"\nVenue Name: " + response.data[i].venue.name +
					"\nVenue Location: " + response.data[i].venue.city +
					"\nDate of the Event: " + response.data[i].datetime + //fix date with moment
					"\n--------------------------------------------------------------------";
				console.log(concertResults);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

//SPOTIFY SEARCH ============================================================================
let spotifySearch = (search) => {
	spotify.search({
		type: 'artist,track',
		query: search
	}, function (err, response) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		let songResults = "----------------------------------------------------------------" +
			"\nArtist(s): " + response.tracks.items[0].artists[0].name +
			"\nSong Name: " + response.tracks.items[0].name +
			"\nAlbum Name: " + response.tracks.items[0].album.name +
			"\nPreview Link: " + response.tracks.items[0].preview_url +
			"\n--------------------------------------------------------------------";
		console.log(songResults);
	});
}

//OMDB SEARCH
let movieSearch = (search) => {
	axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
		.then(function (response) {
				 movieResults = "--------------------------------------------------------------------" +
					"\nTitle " + response.data.Title +
					"\nYear: " + response.data.Year +
					"\nIMDB Rating: " + response.data.Ratings[0].Value +
					"\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
					"\nCountry: " + response.data.Country +
					"\nLanguage: " + response.data.Language +
					"\nPlot: " + response.data.Plot +
					"\nActors/Actresses " + response.data.Actors +
					"\n--------------------------------------------------------------------";
				console.log(movieResults);
		})
		.catch(function (error) {
			console.log(error);
		});
		
}
//SWITCH STATEMENTS ==========================================================================
switch (command) {
	case "concert-this":
		bandSearch(search);
		break;
	case "spotify-this-song":
		spotifySearch(search);
		break;
	case "movie-this":
		movieSearch(search);
		break;
	// case "do-what-is-says" FIX DO WHAT IT SAYS - FIGURE OUT WHAT YOU ARE SUPPOSED TO DO

}
