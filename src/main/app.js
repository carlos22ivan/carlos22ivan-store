const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const config = require('config')
const createError = require('http-errors')
const bodyparser = require('body-parser')
const path = require('path')
const router = require('./router')
const app = express()


/**
 * mongo database
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.get('database.url'))
        .then(() => console.log(`Mongoose connection open to ${config.get('database.url')}`))
        .catch(err => console.log('Mongoose connection error: ' + err))

/**
 * middleware
 */
app.use(logger('short'))
app.use(bodyparser.json())

/**
 * template engine
 */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))

/**
 * routes
 */
app.use(router)


/**
 * error handler
 */
app.use((req, res, next) => res.render('index', {error: createError(404)}));
app.use((err, req, res, next) => res.render('index', {error: createError(500)}));

/**
 * express server
 */
app.listen(config.get('express.port'), () => {
        console.log(`Express server listen in http://localhost:${config.get('express.port')}/`)
})

module.exports = app;
