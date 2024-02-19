import { useAtomValue } from "jotai";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { userExpenses } from "../store/expense";
import { groupExpensesByWeek } from "../utils/expenses";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const ExpensesChart = () => {
  const expenses = useAtomValue(userExpenses);

  const groupedExpenses = groupExpensesByWeek(expenses);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Your Expenses by Week",
      },
    },
  };

  const data = {
    labels: Object.entries(groupedExpenses).map(
      ([key, value]) => `${key} - ${`$${value}`}`,
    ),
    datasets: [
      {
        label: "Week and Total Expenses",
        data: Object.values(groupedExpenses),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
