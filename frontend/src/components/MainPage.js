import React, { useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";
import BudgetCard from "./BudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
import axios from 'axios'
const BASE_URL = "http://localhost:5000/api/v1/";

export default function MainPage() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { newBudgets, getBudgetExpenses } = useBudgets();
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  const [userData, setUserData] = useState("");

  async function userDetails() {
    try {
      const response = await axios.post(`${BASE_URL}user-details`, {
        token: window.localStorage.getItem("token"),
      });
      setUserData(response.data.data);
      if (response.data.data == "token expire") {
        alert("Token expired login again");
        window.localStorage.clear();
        window.location.href = "./sign-in";
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    userDetails();
  }, [])
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <p className="ms-auto text1" style={{ color: "#FFB30D" }}>Budgets</p>
          <div className="ms-auto align-items-right text2">
            <p style={{ color: "white" }}>User: {userData.fname + " " + userData.lname}</p>
            <Button onClick={logOut} variant="secondary" className="logout-button">
              Log Out
            </Button>
          </div>
        </Stack>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <Button variant="secondary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-secondary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {newBudgets.map((budget) => {
            const amount = getBudgetExpenses(budget._id).reduce(
              (total, expense) => total + expense.Amount,
              0
            );
            return (
              <BudgetCard
                key={budget._id}
                name={budget.Name}
                amount={amount}
                max={budget.maxSpending}
                onAddExpenseClick={() => openAddExpenseModal(budget._id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget._id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() =>
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}
