const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main route
app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Trip Service." });
  initial();
});

// routes
require("./app/routes/trips.routes")(app);


// set port, listen for requests
const PORT = 3002;
const SERVER = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});