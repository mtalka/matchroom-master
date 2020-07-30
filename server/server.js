require("dotenv").config();

const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Serve the static files
app.use(express.static("dist"));

// An api endpoint that returns the match object
app.get("/api/getMatch/:matchId", (req, res) => {
    console.log(req);
    const url = `https://open.faceit.com/data/v4/matches/${req.params.matchId}`;

    console.log(url)

    axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.FACEIT_APIKEY}`
            }
        })
        .then(response => res.json(response.data))
        .catch(e => {
            res.status(404).json({ message: e.message })
        });
});

// An api endpoint that returns individual player stats
app.get("/api/getPlayerStats/:playerId", (req, res) => {
    const url = `https://open.faceit.com/data/v4/players/${req.params.playerId}/stats/csgo`;

    axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.FACEIT_APIKEY}`
        }
    })
        .then(response => res.json(response.data))
        .catch(e => {
            res.status(404).json({ message: e.message })
        });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);