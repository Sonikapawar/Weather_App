const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const API_KEY = "e8241fe27939482d9d1502fad66bc898";

// Serve static files (html, css, images)
app.use(express.static(__dirname));

// Serve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Weather API route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City required" });

    try {
        // Encode city properly
        const encodedCity = encodeURIComponent(city.trim());
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`;

        console.log("Requesting:", url); // DEBUG

        const response = await axios.get(url);

        console.log("API Response:", response.data); // DEBUG

        res.json(response.data);
    } catch (err) {
        // Print full error response from OpenWeatherMap
        console.error("OpenWeatherMap Error:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: "City not found or API error" });
    }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
