require("dotenv").config();

//imports the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
//access keys information 
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios"); 
var fs = require("fs"); 
var moment = require("moment"); 
    moment().format();


// switch statement for commands linked to second and third items in input array
var command = process.argv[2]; 
var value = process.argv[3]; 

//switch function allowing user to put one command and value
function userInput (command, value){
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

userInput(command, value);
// Functions for commands
// where value is an artist or band - node liri.js concert-this <artist/band name here>
function concertThis(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  
  .then(function(response) {    
      for (var i = 0; i < 3; i++) {
          var eventResults = 
              "--------------------------------------------------------------------" +
                  "\nVenue Name: " + response.data[i].venue.name + 
                  "\nVenue Location: " + response.data[i].venue.city +
                  "\nDate of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n" +
              "--------------------------------------------------------------------"; 
      console.log(eventResults);
     }
  }).catch(function () {
      console.log("Doesn't look like they are touring, pick another band/artist!");
  });
}
// value is title of song- node liri.js spotify-this-song '<song name here>'
function spotifyThis(value) {
      if(!value){
      value = "Ace of Base";
    }
  spotify.search({ 
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
      console.log("Hmmm never heard of that song, pick another");
  });
}
// value is movie name- node liri.js movie-this '<movie name here>'
function movieThis(value) {
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
      "\nWe cannot seem to locate that film, please choose another" +
      "\n--------------------------------------------------------------------");
  }); 
}


