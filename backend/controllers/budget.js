const BudgetModel = require('../models/BudgetModel')

exports.addBudget = async (req, res) => {
    const { userId, Name, maxSpending} = req.body

    const budget = BudgetModel({ //This instance is a document.
        userId,
        Name,
        maxSpending
    })

    try {
        //validations
        if (!Name || !maxSpending) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (maxSpending <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await budget.save() //saving the document to mongodb
        res.status(200).json({ message: 'Budget Added' })
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}
exports.getBudgets = async (req, res) => {
    try {
        const budgets = await BudgetModel.find();
        res.status(200).json(budgets)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}
exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    await BudgetModel.findByIdAndDelete(id).then(() => {
        res.status(200).json({ message: 'Budget Deleted' })
    })
    .catch((error) => {
        res.status(500).json({ message: 'Server Error' })
    })
}