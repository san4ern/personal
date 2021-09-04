const express = require('express');
const path = require("path");
const { readdirSync, rename } = require('fs');
const app = new express();
app.requests = 0;

module.exports = async client => {
    app.client = client;
    client.my = app;

    app.use(function (req, res, next) {
        app.requests++;
        next();
    })

    app.use('/images/', express.static(__dirname + '/images'));

    app.use('/', express.static(__dirname + '/public'));

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'))
    })

    app.get('/discord', function (req, res) {
        res.redirect('https://discord.gg/GQF3ANKFuw')
    })

    app.get('/stats', function (req, res) {
        res.send({
            requests: app.requests
        })
    })

    app.get('/random', function (req, res) {
        const {query} = req;

        if (!query.q) {
            return res.send({
                type: false,
                message: 'You haven\'t provide method'
            })
        }

        const dirs = readdirSync('./api/images');
        if (!dirs.includes(query.q)) {
            return res.send({
                type: false,
                message: 'No such method were found'
            })

        } else {

            const images = readdirSync(`./api/images/${query.q}`);
            if (!images.length) {
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

    app.use(async function (req, res) {
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
}
