const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: String, 
        trim: true,
    },
    budgetId: {
        type: String, //This should be string
        trim: true
    },
    Description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    Amount: {
        type: Number,
        required: true,
        maxLength: 20,
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Expense', ExpenseSchema)