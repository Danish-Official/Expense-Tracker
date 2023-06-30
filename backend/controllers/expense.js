const ExpenseModel = require('../models/ExpenseModel')

exports.addExpense = async (req, res) => {
    const { userId, budgetId, Description, Amount } = req.body

    const expense = ExpenseModel({
        userId,
        budgetId,
        Description,
        Amount
    })

    try {
        //validations
        if (!Description || !Amount) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (Amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await expense.save() //saving the document to mongodb
        res.status(200).json({ message: 'Expense Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

// find() returns a mongoose query object

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseModel.find();
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.updateExpense = async (req, res) => {
    await ExpenseModel.updateMany(
        { budgetId: req.params.id }, // Filter criteria
        { $set: { budgetId: 'uncategorized' } } // modification
    ).then(() => {
        res.status(200).json({ message: 'Expense Updated' })
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    await ExpenseModel.findByIdAndDelete(id).then(() => {
        res.status(200).json({ message: 'Expense Deleted' })
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}