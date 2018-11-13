const mongoose = require('mongoose')

const schema = {
        name: {
                type: String,
                unique: true,
                required: [true, 'Name is required!']
        }
}
const clothing = new mongoose.Schema(schema)
const clothingModel = mongoose.model('Clothing', clothing)

module.exports = clothingModel