require('dotenv').config()
const express = require('express'),
    app = express(),
    GoogleImages = require('google-images'),
    path = require('path'),
    client = new GoogleImages(process.env.APP_ID, process.env.GOOGLE_API)

app.use(express.static(path.resolve(__dirname + '/public')))

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
})

app.get('/api/images', (req, res) => {

    let q = req.query.q,
        response = {}
    client.search(q, { page: 2 }).then(images => {
        response = {
            error: 0,
            urls: []
        }
        images.forEach(element => {
            response.urls.push(element.url)
        })
        res.json(response)
    }).catch(err => {
        response = {
            error: {
                code: 1,
                msg: err
            },
            urls : null
        }
        res.json(response)
    })
})

app.listen(3000, err => {
    if (err) return console.log(err)
    console.log(`server running`)
})