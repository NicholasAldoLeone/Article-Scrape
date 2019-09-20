const mongoose = require("mongoose");
const Schema = mongoose.Schema

const favoriateSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    summary: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    }
})

const Favoriate = mongoose.model("favoriates", favoriateSchema);

module.exports = Favoriate;