require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api"); 
var song = new Spotify(keys.spotify);
var axios = require("axios");

var fs = require("fs");

var moment = require("moment"); 
moment().format();


// switch statement for general commands linked to second and third items in input array

var command = process.argv[2]; 
var value = process.argv.slice(3).join(" "); 

function userInput(command,value) {
    switch (command) {
        case "concert-this":
            concertThis(value);
            break;
        case "spotify-this-song":
            spotifyThis(value);
            break;
        case "movie-this":
            movieThis(value);
            break;
        case "do-what-it-says":
            doThis(value);
            break;
        }
    }

userInput(command,value);
// Functions for commands
// where value is an artist or band - node liri.js concert-this <artist/band name here>
function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < 3; i++) {
            var eventResults = 
                "\n--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n" +
                "\n--------------------------------------------------------------------"; 
        console.log(eventResults);
        }
    }).catch(function() {
        console.log("Selection currently not touring, please try another band/artist");
    });
    };
    

// value is title of song- node liri.js spotify-this-song '<song name here>'
function spotifyThis(value) {
    if(!value){
    value = "Ace of Base";
    }
    song.search({ 
        type: "track", 
        query: value 
    }).then(function(response) {
      for (var i = 0; i < 1; i++) {
          var spotifyResults = 
              "-----------------------------------------------------------------------------------------------------------------------" +
                  "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                  "\nSong Name: " + response.tracks.items[i].name +
                  "\nAlbum Name: " + response.tracks.items[i].album.name +
                  "\nPreview Link: " + response.tracks.items[i].album.external_urls.spotify + "\n" +
              "------------------------------------------------------------------------------------------------------------------------";
                  
          console.log(spotifyResults);
      }
  }).catch(function() {
      console.log("Song not valid; try another");
  });
}

//value is movie name- node liri.js movie-this '<movie name here>'
function movieThis(value) {
//default value if there is no input
  if(!value){
      value = "Mr. Nobody";
  }
  axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
  .then(function(response) {
      for (var i=0; i<1; i++) {
          var movieResults = 
              "--------------------------------------------------------------------" +
                  "\nMovie Title: " + response.data.Title + 
                  "\nYear of Release: " + response.data.Year +
                  "\nIMDB Rating: " + response.data.imdbRating +
                  "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                  "\nCountry Produced: " + response.data.Country +
                  "\nLanguage: " + response.data.Language +
                  "\nPlot: " + response.data.Plot +
                  "\nActors/Actresses: " + response.data.Actors + "\n" +
              "--------------------------------------------------------------------";
          console.log(movieResults);
        }
        
    }).catch(function() {
      console.log(
    "\n--------------------------------------------------------------------" + 
      "\nCan't seem to find that film, please select another" +
      "\n--------------------------------------------------------------------");
  }); 
}
// last function to read from text file- node liri.js do-what-it-says
function doThis () {
    fs.readFile("random.txt", "utf-8", function(error,data) {

        if (error) {
            return console.log(error);
        }
        console.log("data is: " + data);

        var output = data.split(",");

        command = output[0];
        value = output[1];
            console.log("Command is: " + command);
            console.log("Value is: " + value);

        userInput(command, value);
    });
}
