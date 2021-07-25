const express = require('express');
const { readdirSync, rename } = require('fs');
const app = new express();
let requests = 0;
app.use(function(req, res, next) {
    requests++;
    next();
})
app.get('/', function (req, res) {
        res.redirect('https://guides.san4ouZ.ml/api')
})
app.get('/stats', function (req, res) {
    res.send({
        requests: requests
    })
})
app.use('/images/', () => {
    express.static(__dirname + '/images');
});

app.get('/random', function (req, res) {
        const { query } = req;

        if(!query.q) {
            return res.send({
                type: false,
                message: 'You haven\'t provide method'
            })
        }

    const dirs = readdirSync('./api/images');
    if(!dirs.includes(query.q)) {
        return res.send({
            type: false,
            message: 'No such method were found'
        })

    } else {

        const images = readdirSync(`./api/images/${query.q}`);
        if(!images.length) {
            return res.send({
                type: false,
                message: 'There are not images to get randomized'
            })

        } else {

            const random = Math.floor(Math.random() * images.length);
            const img = images[random];
            res.send({
                type: true,
                message: process.env.DOMAIN + `/images/${query.q}/${img}`
            })

        }
    }
})

app.use(function(req, res) {
    const images = readdirSync('./api/images/memes');

    const random = Math.floor(Math.random() * images.length);
    const img = images[random];

    res.sendFile(__dirname + `/images/memes/${img}`)
});

/* const files = readdirSync('./images/foxes');
for(const file of files) {
    const fileext = file.split(' ')[1].replace('(', '').replace(')', '')
    rename(__dirname + `/images/foxes/${file}`, __dirname + `/images/foxes/${fileext}`, (err) => {
        if (err) throw err;
        console.log('renamed complete');
    });
} */
app.listen(process.env.PORT || 8000);
    console.log(`Listen on port ${process.env.PORT || 8000}`);