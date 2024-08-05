import React from "react";
import { GroupedExpenses } from "../Expense";
import "./ExpenseDashboard.scss";

interface ExpenseDashboardProps {
  item: GroupedExpenses;
}

export default function ExpenseDashboard({ item }: ExpenseDashboardProps) {
  return (
    <div className="expense">
      <div className="expense__category">{item.category}</div>
      <div className="expense__description">
        - {item.items.length} expense(s)
      </div>
      <div className="expense__cost">${item.totalAmount}</div>
    </div>
  );
}
