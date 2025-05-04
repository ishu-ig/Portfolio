const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

require("./db_connect");

const Router = require("./routes/index");
const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:8000', 'http://localhost:4000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Error, You Are not authenticated to access this API'));
    }
  }
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api", Router);

// ✅ Serve React Client (Main User Side) at "/"
app.use("/", express.static(path.join(__dirname, "client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
