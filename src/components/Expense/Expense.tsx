import React, { useEffect, useState } from "react";
import { convertToUsd } from "../../utils/helper";
import input from "../../input.json";
import ExpenseDashboard from "./ExpenseDashboard/ExpenseDashboard";
import Accordion from "../../shared/components/Accordion/Accordion";
import "./Expense.scss";
import ExpenseList from "./ExpenseList/ExpenseList";

export interface Expense {
  id: string;
  description: string;
  category: string;
  currency: string;
  shop: string;
  date: number;
  amount: number;
}

export interface GroupedExpenses {
  id: string;
  category: string;
  items: Expense[];
  isFavorite: boolean;
  totalAmount: number;
}

export default function Expense() {
  const [items, setItems] = useState<GroupedExpenses[]>([]);

  useEffect(() => {
    const sortedData = getSortedData(input);
    setItems(sortedData);
  }, []);

  function setLike(id: string) {
    const updatedData = items.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );

    setItems(updatedData);
  }

  function getSortedData(input: Expense[]) {
    const sorted = input.reduce((acc: GroupedExpenses[], item) => {
      let categoryGroup = acc.find((group) => group.category === item.category);

      if (!categoryGroup) {
        categoryGroup = {
          id: item.id,
          category: item.category,
          items: [],
          isFavorite: false,
          totalAmount: 0,
        };
        acc.push(categoryGroup);
      }

      categoryGroup.items.push(item);
      categoryGroup.totalAmount += convertToUsd(item.currency, item.amount);

      categoryGroup.items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log("acc", acc);
      return acc;
    }, []);

    return sorted.sort((a, b) => {
      if (a.totalAmount === b.totalAmount) {
        return b.items.length - a.items.length;
      } else {
        return b.totalAmount - a.totalAmount;
      }
    });
  }

  return (
    <div className="container">
      {items.map((item) => (
        <Accordion
          key={item.id}
          content={<ExpenseList listItems={item.items} />}
        >
          <ExpenseDashboard item={item} setLike={setLike} />
        </Accordion>
      ))}
    </div>
  );
}
