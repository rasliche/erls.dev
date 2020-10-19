const express = require('express')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')
require('dotenv').config()

const BASE_URL = 'localhost:3000'

const ShortURL = require('./models/url.js')

const app = express()
const port = 3000

app.use(express.urlencoded({
    extended: true
}))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get('/', async (req, res, next) => {
    const urls = await ShortURL.find()
    res.render('index.njk', {
        urls
    })
})

app.get('/:shortId', async (req, res, next) => {
    const url = await ShortURL.findOneAndUpdate({
        shortId: req.params.shortId
    }, { $inc: { clicks: 1 }})
    if (!url) return res.status(404)
    res.redirect(url.longUrl)
})

app.post('/short', async (req, res, next) => {
    let url = await ShortURL.findOne({ shortId: req.body.url })
    if (!url) {
        url = new ShortURL({
            longUrl: req.body.url,
        })
        await url.save()
    }
    res.redirect('/')
})

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection

db.once('open', function() {
    app.listen(port, () => {
        console.log(`Now eagerly listening on ${port}`)
    })
})