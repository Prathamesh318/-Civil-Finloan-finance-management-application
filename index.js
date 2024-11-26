require("dotenv").config();
const express = require("express");
const Database = require("./config/database");

const serviceRoutes = require("./routes/serviceRoutes");
const requestRoutes = require("./routes/requestRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

app.use(express.json());

Database.connect();

app.use("/services", serviceRoutes); 
app.use("/requests", requestRoutes); 
app.use("/members", memberRoutes); 

app.get("/", (req, res) => {
    res.status(200).send("API is running!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
