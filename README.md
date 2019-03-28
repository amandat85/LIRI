# LIRI-Node-Application
 LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. 

## Repository 
https://github.com/amandat85/LIRI-Node-Application

## Languages, Tools and Techologies
* JavaScript
* Node.js
* NPM
* API, Spotify, OMDB, Bands In Town
* Axios
* Moment

 ## Setup Files
 To use LIRI you will need install and create certain files to get it to run.

 1. Clone/download the repository for the following github page: https://github.com/amandat85/LIRI-Node-Application.
 2. Create a .gitignore file. In this .gitignore file add the following file names:
    ```
    .DS_Store
    node_modules
    .env
    ```
3. Create a .env file. In this file you will add the following:
    ```
    exports.spotify = {
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    };
    ```
4. To acquire a Spotify Client ID and Client Secret you will need to:
    * Visit https://developer.spotify.com/my-applications/#!/
    * Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    * Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the complete button.
    * On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
    * Replace the SPOTIFY_ID in the .env file with the Client ID you just acquired. Replace the SPOTIFY_SECRET in the .env with the Client Secret you just acquiried.

## Setup Node and NPM
5. Check that you have node.js and node package manager (npm) installed. To do this open the terminal and type `node -v` and then `npm -v`. If a version number shows up, you have it installed. If nothing shows up then you need to do some installations. To install node.js and npm you can simply install node and it will take care of both: https://nodejs.org/en/
6. Next, navigate to the directory holding the cloned or downloaded LIRI repository.
7. When in th repository directory run `npm install`
8. This should install the following node modules and their dependencies:
    * axios
    * dotenv
    * moment
    * node-spotify-api

You should now be ready to run the application.

## How it works
1. The application allows you to search information about movies, songs, bands/artists and also holds a surprise search.
2. Open up your terminal
3. Navigate to your LIRI-Node-Application directory

### To Search a Movie

To search movies type in the following command:
```
node liri.js movie-this <name of movie here>
```
If you enter nothing, the application will automatically search for the movie "Mr. Nobody."

### To Search a band or artist

To search bands/artists, type in the following command:
```
node liri.js concert-this <name of band/artist here>
```

### To Search a song

To search songs, type in the following command:
```
node liri.js spotify-this-song <song name here>
```
If you do not enter anything, the application will search for "The Sign," by Ace of Base.

### Surprise Search

To search the surprise search parameters, type the command:
```
node liri.js do-what-it-says
```
Please watch this video demo: https://drive.google.com/file/d/1UbouArFy36TPcbJ5cSQLf5R0soHEaowv/view?usp=sharing

Enjoy!

## License
MIT


