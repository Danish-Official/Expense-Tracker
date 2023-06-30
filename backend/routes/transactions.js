const { addBudget, getBudgets, deleteBudget } = require('../controllers/budget.js');
const { addExpense, getExpenses, deleteExpense, updateExpense } = require('../controllers/expense.js');
const {registerUser, loginUser,userDetails} = require('../controllers/user.js');

const router = require('express').Router();

router
    .get('/get-expenses', getExpenses)
    .get('/get-budgets', getBudgets)
    .post('/add-expense', addExpense)
    .post('/add-budget', addBudget)
    .delete('/delete-expense/:id', deleteExpense)
    .delete('/delete-budget/:id', deleteBudget)
    .put('/update-expense/:id', updateExpense)
    .post('/register', registerUser)
    .post('/login', loginUser)
    .post('/user-details', userDetails);

module.exports = router;