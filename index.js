require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
const connectionString = process.env.MONGO_URL;
const app = express();
const httpStatusText = require("./utils/httpsStatusText");

// use cors to solve CORS problem in frontend
app.use(cors())

// connect to database
mongoose.connect(connectionString).then(re => {
    console.log("database server started probalby");
})

// we use this middleware to handle response json body comming from the frontend
// this middle ware uses "body.parser" package 
// "body.parser" is injected in express by default
app.use(express.json());

const articlesRouter = require("./routers/articles.router");
const authorsRouter = require("./routers/authors.router");

// app.use("/api/articles", articlesRouter); // localhost:400//// => /
app.use("/api/articles", articlesRouter);
app.use("/api/authors", authorsRouter);

// middleware handler
app.all("*", (req, res, next) => {
    return res.status(404),json({
        status: httpStatusText.ERROR,
        message: "this resource is not found"
    })
})

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})