import { getUserByClerkId } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json();
  const user = await getUserByClerkId();

  const updatedExpense = await prisma.expense.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: {
      place: content.place,
      price: content.price,
      name: content.name,
      description: content.description,
      purchaseDate: content.purchaseDate,
    },
  });

  return NextResponse.json({ data: updatedExpense });
};

export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId();

  await prisma.expense.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  });

  return NextResponse.json({ data: "success" });
};
