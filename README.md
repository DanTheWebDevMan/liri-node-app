# liri-node-app

The LIRI application was made for this assignment, which is similiar to iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives data in return.

## *What does the app do?*

1. The app  connects to 4 different systems(servers) using APIs and the user can input one of four commands to get a different response from the systems. The four commands are: 
  1. concert-this
    1. Connects to Bands In Town Artist Events API
  2. spotify-this-song
    1. Connects to Spotify API 
  3. movie-this
    1. Connects to Axios package which retrieves data from the OMDB API
  4. do-what-it-says
    1. Runs the command and value inside the random.txt file

## *What does the user need to do?*

 1. User chooses one of the above commands along with a corresponding value and puts into terminal in order to get requested information
    1. User puts in data in the following format inside terminal: 
    
    node <name of file> "command" "value"
  
## *How is the app structured on the backend?*

### The Setup
* 'npm init -y' was ran in order to initialize my 'package.json' file
  * This is required in order to run 3rd party npm packages and saving their version numbers
* created a .gitignore file mentioning the files I don't want commited to Github
* created a keys.js file where my spotify API info was stored and referenced to
* .env file created to with my api info
  * This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github; keeping our API key information private.
* created a random.txt file with a random command and value
* at the top of my liri.js file, included code to read and set any environment variable with the dotenv package
  * added coderequired to import the keys.js file and stored it in a variable

### What exactly does each command do?
#### Concert-this
  * This will search the Bands in Town Artist Events API for an artist and render the following info about each event to the terminal:
   ```
   * Name of Venue 
   * Venue Location 
   * Date of the Event
   ```
#### Spotify-this-song
  * This will show the following information about the song in your terminal/bash window:
  Artist, the song's name, link to preview on Spotify, the album the song is on
  * If no song is provided then program will default to "The Sign" by Ace of Base
#### Movie-this
  * This will output the following information to your terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
 #### Do-what-it-says
 * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
 

## *How does it look?*




5. Contain a link to a deployed version of the app


