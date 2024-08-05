import React from "react";
import { GroupedExpenses } from "../Expense";
import "./ExpenseDashboard.scss";

interface ExpenseDashboardProps {
  item: GroupedExpenses;
  setLike(id: string): void;
}

export default function ExpenseDashboard({
  item,
  setLike,
}: ExpenseDashboardProps) {
  function handleSetFavorite(e) {
    e.stopPropagation();
    setLike(item.id);
  }

  return (
    <div className="expense">
      <div className="expense__icon" onClick={handleSetFavorite}>
        {item.isFavorite ? "❤️" : "🩶"}
      </div>
      <div className="expense__category">{item.category}</div>
      <div className="expense__description">
        - {item.items.length} expense(s)
      </div>
      <div className="expense__cost">${item.totalAmount}</div>
    </div>
  );
}
