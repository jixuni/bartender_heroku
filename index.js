const express = require("express");
const app = express();
const db = require("./models/index");
const config = require("config");
const cors = require("cors");
const beer = require("./routes/beerRoute");
const brewery = require("./routes/breweryRoute");
const category = require("./routes/categoryRoute");
const country = require("./routes/countryRoute");
const flavor = require("./routes/flavorRoute");
const login = require("./routes/loginRoute");
const review = require("./routes/reviewRoute");
const style = require("./routes/styleRoute");
const type = require("./routes/typeRoute");
const user = require("./routes/userRoute");

const PORT = process.env.PORT || 8888;
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", user);
app.use("/api/beer", beer);
app.use("/api/brewery", brewery);
app.use("/api/category", category);
app.use("/api/country", country);
app.use("/api/flavor", flavor);
app.use("/login", login);
app.use("/api/review", review);
app.use("/api/style", style);
app.use("/api/type", type);

// use { force: true } argument in sync to drop all tables
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
