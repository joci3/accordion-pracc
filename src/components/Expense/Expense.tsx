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
  totalAmount: number;
}

export default function Expense() {
  const [items, setItems] = useState<Expense[]>([]);

  const itemsByCategory = items.reduce((acc: GroupedExpenses[], item) => {
    let categoryGroup = acc.find((group) => group.category === item.category);

    if (!categoryGroup) {
      categoryGroup = {
        id: item.id,
        category: item.category,
        items: [],
        totalAmount: 0,
      };
      acc.push(categoryGroup);
    }

    categoryGroup.items.push(item);
    categoryGroup.totalAmount += convertToUsd(item.currency, item.amount);

    categoryGroup.items.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return acc;
  }, []);

  const sortedCategories = itemsByCategory.sort((a, b) => {
    if (a.totalAmount === b.totalAmount) {
      return b.items.length - a.items.length;
    } else {
      return b.totalAmount - a.totalAmount;
    }
  });

  useEffect(() => {
    setItems(input);
    console.log(items);
  }, []);

  return (
    <div className="container">
      {sortedCategories.map((item) => (
        <Accordion
          key={item.id}
          content={<ExpenseList listItems={item.items} />}
        >
          <ExpenseDashboard item={item} />
        </Accordion>
      ))}
    </div>
  );
}
