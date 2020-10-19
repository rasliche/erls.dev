const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
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

const ShortURL = mongoose.model('ShortURL', shortUrlSchema)

module.exports = ShortURL