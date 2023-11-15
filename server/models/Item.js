const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price : {type: Number, required: true},
    user: { type: String } // Reference to the User model
},{collection: 'items'}
);

module.exports = mongoose.model('Item', itemSchema); 