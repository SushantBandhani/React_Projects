import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 120, expense: 30 },
  { name: "Feb", income: 160, expense: 50 },
  { name: "Mar", income: 230, expense: 70 },
  { name: "Apr", income: 5400, expense: 5400 },
  { name: "May", income: 80, expense: 30 },
  { name: "Jun", income: 250, expense: 80 },
  { name: "Jul", income: 300, expense: 100 },
];

const StackedBarChart = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>All Transactions</h2>
      <p style={{ textAlign: "center", color: "gray" }}>2nd Jan to 21th Dec</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" stackId="a" fill="#6a0dad" />
          <Bar dataKey="expense" stackId="a" fill="#c08cf3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart; 
