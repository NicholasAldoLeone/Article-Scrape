var express = require("express");
var mongoose = require("mongoose");
var routes = require("./routes");
var exphbs = require("express-handlebars");
var app = express();

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/mongo_scraper",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
    );

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(8080, function(){
    console.log("App running on http://localhost:8080");
})