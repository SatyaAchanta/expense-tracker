import { iExpenseEntry } from "@/types";

export const groupExpensesByWeek = (expenses: iExpenseEntry[]): Record<number, number> => {
    const groupedExpenses: Record<number, number> = {};

    expenses.forEach((expense) => {
        const weekNumber = getWeekNumber(expense.purchaseDate);

        if (groupedExpenses[weekNumber]) {
            groupedExpenses[weekNumber]++;
        } else {
            groupedExpenses[weekNumber] = 1;
        }
    });

    return groupedExpenses;
}

const getWeekNumber = (date: Date): number => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInWeek = 604800000;
    return Math.ceil(((date.getTime() - oneJan.getTime()) / millisecondsInWeek) + 1);
}