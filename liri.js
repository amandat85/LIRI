//REQUIRE =========================================================================================================================
require("dotenv").config();
const keys = require("./keys.js");
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let axios = require("axios");
let moment = require("moment");
let fs = require("fs");
//VARIABLES =========================================================================================================================
let command = process.argv[2];
let search = process.argv.slice(3).join(" ");

//BANDS IN TOWN SEARCH ==============================================================================================================
let bandSearch = (search) => {
	axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
		.then(function (response) {
			for (var i = 0; i < 5; i++) {
				let concertResults = "--------------------------------------------------------------------" +
					"\nVenue Name: " + response.data[i].venue.name +
					"\nVenue Location: " + response.data[i].venue.city +
					"\nDate of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") +
					"\n--------------------------------------------------------------------";
				console.log(concertResults);
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

//SPOTIFY SEARCH ==============================================================================================================
let spotifySearch = (search) => {
	if (!search) {
		search = "The Sign:Ace of Base";
	}
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
			"\nPreview Link: " + response.tracks.items[0].external_urls.spotify +
			"\n--------------------------------------------------------------------";
		console.log(songResults);
	});
}

//OMDB SEARCH ================================================================================================================
let movieSearch = (search) => {
	if (!search) {
		search = "Mr. Nobody"
	}
	axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
		.then(function (response) {
			let = movieResults = "--------------------------------------------------------------------" +
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

let doWhatItSay = () => {
	fs.readFile("random.txt", "utf8", function (error, data) {
		if (error) {
			return console.log(error);
		}
		let dataArr = data.split(",");
		spotifySearch(dataArr[1])
	})
}
//LOG TEXT ==================================================================================================================
let logText = () => {
	fs.appendFile("log.txt", search + ", ", function (err) {
		if (err) {
			console.log(err);
		}
	})
}
logText();

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
	case "do-what-it-says":
		doWhatItSay();
		break;
}