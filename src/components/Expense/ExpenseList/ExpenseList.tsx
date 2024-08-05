import React from "react";
import { Expense } from "../Expense";
import { formatDate, getCurrency } from "../../../utils/helper";
import "./ExpenseList.scss";

interface ExpenseListProps {
  listItems: Expense[];
}

export default function ExpenseList({ listItems }: ExpenseListProps) {
  return (
    <div className="list">
      {listItems.map((item) => (
        <div key={item.date} className="list-item">
          <div className="list-item__date">{formatDate(item.date)}</div>
          <div className="list-item__shop">{item.shop}</div>
          <div className="list-item__amount">
            {getCurrency(item.currency)}
            {item.amount}
          </div>
        </div>
      ))}
    </div>
  );
}
