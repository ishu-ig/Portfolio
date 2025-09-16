const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();              // ✅ Load env first
require("./db_connect");                // ✅ Connect to DB

const app = express();
const Router = require("./routes/index");

const whitelist = ['http://localhost:4000','http://localhost:3000', 'http://localhost:8000', 'http://localhost:5000','https://portfolio-psl7.onrender.com','https://portfolio-fawn-pi-94.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Error: Not authorized'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/public", express.static("public"));
app.use("/api", Router);

// Serve React frontend
app.use("", express.static(path.join(__dirname, "client/build")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
