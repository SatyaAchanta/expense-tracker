import { getUserByClerkId } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const { budget, flagExpenseTreshold } = await req.json();

  const user = await getUserByClerkId();

  const updatedExpense = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      budget: budget,
      flagExpenseTreshold: flagExpenseTreshold,
    },
  });

  // revalidatePath("/dashboard");

  return NextResponse.json({ data: updatedExpense });
};

export const GET = async () => {
  const user = await getUserByClerkId();
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  // revalidatePath("/dashboard");

  return NextResponse.json({ data: userData });
};
