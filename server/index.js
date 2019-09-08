const client_id = "e17efcc20f9749dd9e7eb9756fb8b9a5";
const client_secret = "7a3bd30709f74613b5ac5fbd46b0d0c4";

const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
var cors = require("cors");
var request = require("request");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/authorization", (req, res) => {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
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

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
