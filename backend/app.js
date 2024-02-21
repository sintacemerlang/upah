const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 8003;
const app = express();

app.use(bodyParser.json());
app.use(cors());

//routes
const appRoute = require("./src/routes/route-app");
app.use("/", appRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})