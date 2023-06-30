const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: {
        type: String, 
        trim: true,
    },
    Name: {
        type: String, 
        required: true,
        trim: true,
        maxLength: 50
    },
    maxSpending: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Budget', BudgetSchema)