const mongoose = require('mongoose')

const schema = {
        name: {
                type: String,
                unique: true,
                required: [true, 'Name is required!']
        }
}

const brand = new mongoose.Schema(schema)
const brandModel = mongoose.model('Brand', brand)

module.exports = brandModel