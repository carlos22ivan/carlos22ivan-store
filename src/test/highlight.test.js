const supertest = require('supertest')
const cheerio = require('cheerio')
const app = require('../main/app')

describe('highlight test', () => {
        it('return a html response', (done) => {
                supertest(app)
                        .get('/')
                        .expect('Content-Type', /html/)
                        .expect(200)
                        .end(done)
        })
        it('return a search', (done) => {
                supertest(app)
                        .get('/search?query=carlos+ivan+dresses+HUGO+boss')
                        .expect('Content-Type', /html/)
                        .expect(res => {
                                let html = res.text
                                let $ = cheerio.load(html, {decodeEntities: false})
                                let txtHighlight = $('.searchHighlight').html()
                                if (txtHighlight !== 'carlos ivan <i>dresses</i> <b>HUGO <b>boss</b></b>')
                                        throw new Error('search highlight invalid')
                        })
                        .end(done)

        })
})