import { getUserByClerkId } from "../../utils/auth";
import { prisma } from "../../utils/db";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  const user = await getUserByClerkId();
  console.log(`----- userId from clerkId is ${user.id}`);
  const expenses = await prisma.expense.findMany({
    where: {
      userId: user.id,
    },
  });

  revalidatePath("/dashboard");

  console.log(`----- response is ${JSON.stringify(expenses)}`);

  return NextResponse.json({ data: expenses });
};
