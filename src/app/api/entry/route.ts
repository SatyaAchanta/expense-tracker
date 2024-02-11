import { getUserByClerkId } from "../../utils/auth";
import { prisma } from "../../utils/db";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: Request) => {
  const user = await getUserByClerkId();
  const requestBody = await request.json();
  const expense = requestBody.expense;
  const priceChosen = expense.price as number;
  const entry = await prisma.expense.create({
    data: {
      userId: user.id,
      name: expense.name,
      price: +priceChosen,
      purchaseDate: new Date(expense.purchaseDate).toISOString(),
      place: expense.place,
      description: expense.description,
    },
  });

  // revalidatePath("/dashboard");

  console.log("--- entry is:", entry);

  return NextResponse.json({ data: entry });
};
