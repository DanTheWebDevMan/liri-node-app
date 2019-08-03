require("dotenv").config();

//imports the `keys.js` file and store it in a variable.
var keys = require("./keys.js");

//access keys information 
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
    console.log(spotify);

// var Spotify = require('spotify-web-api-js');
// var s = new Spotify();
// console.log(Spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });
