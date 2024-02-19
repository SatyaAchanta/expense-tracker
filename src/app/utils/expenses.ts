import { iExpenseEntry } from "@/types";
import { getDateInReadableFormat } from "./date";

export const groupExpensesByWeek = (expenses: iExpenseEntry[]): Record<string, number> => {
    const groupedExpenses: Record<string, number> = {};

    expenses.forEach((expense) => {
        const weekNumber = getWeekNumber(expense.purchaseDate);
        const weekNumberAsDate = getDateFromWeekNumber(weekNumber);

        if (groupedExpenses[weekNumberAsDate]) {
            groupedExpenses[weekNumberAsDate] += +(expense.price);
        } else {
            groupedExpenses[weekNumberAsDate] = +expense.price;
        }
    });

    
    return groupedExpenses;
}

export const retrieveTopThreeExpenses = (expenses: iExpenseEntry[]): iExpenseEntry[] => {
    return expenses.sort((a, b) => b.price - a.price).slice(0, 3);
};

export const calculateMaxBudgetValue = (totalSpent: number, limit: number): number => {
    return limit > totalSpent ? limit : totalSpent;
}

const getWeekNumber = (date: Date): number => {
    console.log("Date", date);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInWeek = 604800000;
    return Math.floor(((date.getTime() - oneJan.getTime()) / millisecondsInWeek) + 1);
}

const getDateFromWeekNumber = (weekNumber: number): string => {
    console.log("WeekNumber", weekNumber);
    const oneJan = new Date(new Date().getFullYear(), 0, 1);
    const millisecondsInWeek = 604800000;
    const targetDate = new Date(oneJan.getTime() + (weekNumber - 1) * millisecondsInWeek);
    return getDateInReadableFormat(targetDate);
}