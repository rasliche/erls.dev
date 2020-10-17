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