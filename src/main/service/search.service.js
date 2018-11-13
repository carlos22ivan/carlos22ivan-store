const BrandModel = require('../model/brand.model')
const ClothingModel = require('../model/clothing.model')

/**
 *
 * @param query String
 * @returns queryhighlight String
 */
exports.highlightProduct = async (query) => {
        query = await highlightClothings(query)
        query = await highlightBrands(query)
        return query
}

/**
 *
 * @param query String
 * @returns queryhighlight String
 */
async function highlightClothings(query) {
        let clothings = await ClothingModel.find()
        let clothingsByRelevance = orderByRelevance(clothings)
        clothingsByRelevance.forEach(clothing => {
                let regexp = new RegExp(clothing.name, 'gim')
                query = query.replace(regexp, `<i>$&</i>`)
        })
        return query
}

/**
 *
 * @param query String
 * @returns queryhighlight String
 */
async function highlightBrands(query) {
        let brands = await BrandModel.find()
        let brandsByRelevance = orderByRelevance(brands)
        brandsByRelevance.forEach(brand => {
                let regexp = new RegExp(brand.name, 'gim')
                query = query.replace(regexp, `<b>$&</b>`)
        })
        return query
}

/**
 *
 * @param collectionList List<clothing || brands>
 * @returns collectionList List<clothing || brands>
 */
function orderByRelevance(collectionList) {
        return collectionList.sort((a, b) => b.name.length - a.name.length)
}