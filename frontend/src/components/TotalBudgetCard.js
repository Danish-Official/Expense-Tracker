import { useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard() {
  const { newExpenses, newBudgets } = useBudgets()
  const amount = newExpenses.reduce((total, expense) => total + expense.Amount, 0)
  const max = newBudgets.reduce((total, budget) => total + budget.maxSpending, 0)
  if (max === 0) return null

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />
}
