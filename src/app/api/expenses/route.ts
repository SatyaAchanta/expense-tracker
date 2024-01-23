import { getUserByClerkId } from "../../utils/auth";
import { prisma } from "../../utils/db";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  const user = await getUserByClerkId();
  const expenses = await prisma.expense.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      purchaseDate: "desc",
    },
    take: 10,
  });

  revalidatePath("/dashboard");

  return NextResponse.json({ data: expenses });
};
