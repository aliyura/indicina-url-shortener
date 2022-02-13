const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    urlId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });
module.exports = mongoose.model("URL", urlSchema);