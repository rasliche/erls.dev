const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        default: shortId.generate()
    },
    longUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0
    }
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url