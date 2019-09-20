const router = require("express").Router();
const articleRoute = require("./articles.js");

router.use("/database", articleRoute)

module.exports = router;