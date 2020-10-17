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