import React, { useContext, useEffect, useState } from "react"
import axios from 'axios'

const BASE_URL = "http://localhost:5000/api/v1/";

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = 'uncategorized';

export function useBudgets() {
  return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {

  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=>{
    getBudgets();
    getExpenses();
  },[]);
  const getExpenses = async () => { 
    const response = await axios.get(`${BASE_URL}get-expenses`)
    setExpenses(response.data)
  }
  const getBudgets = async () => { 
    const response = await axios.get(`${BASE_URL}get-budgets`)
    setBudgets(response.data)
  }

  async function addExpense(expense) {
    const response = await axios.post(`${BASE_URL}add-expense`, expense)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getExpenses();
  }
  async function addBudget(budget) {
    const response = await axios.post(`${BASE_URL}add-budget`, budget)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getBudgets();
  }


  async function deleteExpense({ _id }) {
    const response = await axios.delete(`${BASE_URL}delete-expense/${_id}`)
    getExpenses();

  }
  async function deleteBudget({ _id }) {
    const response = await axios.delete(`${BASE_URL}delete-budget/${_id}`)
    getBudgets();
    updateExpense(_id);
  }

  async function updateExpense(_id) {
    const response = await axios.put(`${BASE_URL}update-expense/${_id}`)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getExpenses();
  }
  const getBudgetExpenses = (id) => { 
    return newExpenses.filter(expense => expense.budgetId === id)
  }
  const getUserBudgets = (id) => { 
    return budgets.filter(budget => budget.userId === id)
  }
  const newBudgets = getUserBudgets(window.localStorage.getItem("id"));

  const getUserExpenses = (id) => { 
    return expenses.filter(expense => expense.userId === id)
  }
  const newExpenses = getUserExpenses(window.localStorage.getItem("id"));

  return (
    <BudgetsContext.Provider
      value={{
        newExpenses,
        newBudgets,
        addExpense,
        addBudget,
        deleteExpense,
        deleteBudget,
        getBudgetExpenses
      }}
    >
      {children}
    </BudgetsContext.Provider>
  )
}
