const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Must be provided '],
    },
    price: { 
        type: Number,
        required: [true,'Must be provided '],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: { 
        type: Number,
        default: 0,
    }, 
    createAt: {
        type: Date,
        default: Date.now,
    },
    company : {
        type: String,
        enum: {
            values : ['ikea', 'caressa', 'marcos','liddy'],
            message: 'Invalid company'
        },
    }
});

module.exports = mongoose.model('Product', productSchema);

