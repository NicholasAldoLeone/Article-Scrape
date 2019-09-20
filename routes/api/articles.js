const db = require("../../models");
const router = require("express").Router();

const axios = require("axios");
const cheerio = require("cheerio");

router.get("/", function (req, res) {
    db.Article.find().then(function (data) {
        res.render("index", { articles: data });
    })
})

router.get("/favoriate", function (req, res) {
    db.Favoriate.find().then(function (data) {
        res.render("favoriates", {
            favoriates: data
        })
    })
})

router.post("/add", function (req, res) {
    db.Favoriate.insertMany(
        [
            {

            title: req.body.title,
            summary: req.body.summary,
            url: req.body.url

            }
        ]
    )
    res.send();
})

router.delete("/delete", function (req, res) {
    console.log("Body: " + req.body._id);
    db.Favoriate.findByIdAndRemove(req.body._id, function(data){
        db.Favoriate.remove({_id: data})
    })
    res.send();
})

router.get("/scrape", function (req, res) {
    axios.get("https://www.sciencedaily.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".col-xs-6").each(function (i, element) {
            var title = $(element).children("a").children("h3").text();
            var url = $(element).children("a").attr("href");

            axios.get("https://www.sciencedaily.com" + url).then(function (summaryData) {
                var $ = cheerio.load(summaryData.data);

                $("#abstract").each(function (i, element) {
                    var summary = $(element).text();

                    db.Article.insertMany([{
                        title: title,
                        summary: summary,
                        url: "https://www.sciencedaily.com" + url
                    }],

                        function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(data);
                            }
                        });
                })
            }).catch(function (error) {
                console.log(error);
            })
        });
    }).catch(function (error) {
        console.log(error);
    })
    res.send();
})

module.exports = router;
