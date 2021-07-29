const express = require("express");
const path = require("path");
var axios = require("axios");

app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  try {
    let response = await axios.get("https://api.coincap.io/v2/assets");
    // console.log(response.data);
    return res.render("pages/homepage", { cryptos: response.data.data });
  } catch (error) {
    // console.log(error);
    res.send("500");
  }
});

app.get("/rates", async (req, res) => {
  try {
    let response = await axios.get("https://api.coincap.io/v2/rates");
    // console.log(response.data);
    res.render("pages/rates", { currencies: response.data.data });
  } catch (error) {
    // console.log(error);
    res.send("500");
  }
});

app.get("/info/:id", async (req, res) => {
  try {
    let response = await axios.get(
      `https://api.coincap.io/v2/assets/${req.params.id}/history?interval=d1`
    );
    let y_data = response.data.data.map((point) => {
      return parseFloat(point.priceUsd);
    });
    let x_data = response.data.data.map((point) => {
      let date = new Date(point.time);
      return date.toDateString();
    });
    // console.log(y_data.length, x_data.length);
    response = await axios.get(
      `https://api.coincap.io/v2/assets/${req.params.id}/markets`
    );
    res.render("pages/info", {
      yaxis: y_data,
      xaxis: x_data,
      markets: response.data.data,
    });
  } catch (error) {
    console.log(error);
    res.send("500");
  }
});

app.get("/live", async (req, res) => {
  res.render("pages/live");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started.");
});
