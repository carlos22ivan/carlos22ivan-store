const createError = require('http-errors')
const SearchService = require('../service/search.service')

/**
 * @api {get} / Request index page.
 * @apiSuccess {Html} index page
 */
exports.showHome = (req, res) =>
        res.render('index', {title: 'carlos22ivan store online'})

/**
 * @api {get} /search?query=:query Request search product.
 * @apiParam {String} query search query
 * @apiSuccess {html} index page
 */
exports.searchProduct = async (req, res) => {
        let hasSearchParams = Boolean(Object.keys(req.query).length && req.query.query)
        if (!hasSearchParams)
                res.render('index', {error: createError(400, 'query is required!')})
        let query = req.query.query
        let queryHighlight = await SearchService.highlightProduct(query)
        let params = {
                query: query,
                queryHighlight: queryHighlight,
                title: `${query} - searched by carlos22ivan store online`
        }
        res.render('index', params)
}
