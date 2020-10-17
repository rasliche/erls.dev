app.get('/', async (req, res, next) => {
    const urls = await URL.find()
    res.render('index.njk', {
        urls
    })
})

app.get('/:shortId', async (req, res, next) => {
    const url = await URL.findOneAndUpdate({
        shortId: req.params.shortId
    }, { $inc: { clicks: 1 }})
    res.redirect(url.longUrl)
})

app.post('/short', async (req, res, next) => {
    const url = new URL({
        longUrl: req.body.url,
    })
    await url.save()
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