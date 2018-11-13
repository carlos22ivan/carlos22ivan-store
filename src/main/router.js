const Express = require('express')
const Router = Express.Router()
const HomeController = require('./controllers/home.controller')

Router.route('/').get(HomeController.showHome)
Router.route('/search').get(HomeController.searchProduct)

module.exports = Router