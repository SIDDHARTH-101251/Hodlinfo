const express = require("express");
const axios = require("axios");
const pool = require("./db");
const cors = require("cors");
const port = 8080;

const app = express();
app.use(express.json());
app.use(cors());

// Function to get data from API and store it in the database
const fetchAndStoreData = async () => {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
    const data = response.data;
    const top10 = Object.values(data).slice(0, 10);

    await pool.query(
      "CREATE TABLE IF NOT EXISTS tickers (id SERIAL PRIMARY KEY, name VARCHAR(50), last DECIMAL, buy DECIMAL, sell DECIMAL, volume DECIMAL, base_unit VARCHAR(50))"
    );

    await pool.query("TRUNCATE TABLE tickers");

    let id = 1; // Starting ID for manual insertion
    for (const ticker of top10) {
      await pool.query(
        "INSERT INTO tickers (id, name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          id,
          ticker.name,
          ticker.last,
          ticker.buy,
          ticker.sell,
          ticker.volume,
          ticker.base_unit,
        ]
      );

      // Increment ID for the next row
      id++;
    }

    console.log("Data fetched and stored successfully");
  } catch (err) {
    console.log(err);
  }
};

// Set interval to call fetchAndStoreData every minute
setInterval(fetchAndStoreData, 60000);

// Initial call to fetch and store data when the server starts
fetchAndStoreData();

// Route to get data from the database
app.get("/data", async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM tickers");
    res.json(response.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// App listening to the specified port
app.listen(port, () => console.log(`Server has started on port: ${port}`));
