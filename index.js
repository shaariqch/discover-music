const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
var cors = require("cors");
var request = require("request");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.get("/authorization", (req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Basic ZTE3ZWZjYzIwZjk3NDlkZDllN2ViOTc1NmZiOGI5YTU6NjIwN2RhMWQyNTIyNGUxYTlhOGZiNmY1MzFlYTM4ZDA="
    },
    form: {
      grant_type: "client_credentials"
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // use the access token to access the Spotify Web API
      res.send(JSON.stringify({ access_token: body.access_token }));
    }
  });
});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);