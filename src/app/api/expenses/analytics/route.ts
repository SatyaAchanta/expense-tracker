import { getUserByClerkId } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  const user = await getUserByClerkId();

  const totalExpenses = await prisma.expense.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      price: true,
    },
  });

  return NextResponse.json({ data: totalExpenses._sum.price });
};
