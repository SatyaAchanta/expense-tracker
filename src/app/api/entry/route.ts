import { getUserByClerkId } from "../../utils/auth";
import { prisma } from "../../utils/db";

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.expense.create({
    data: {
      userId: user.id,
      price: 12.34,
      name: "Watch",
      place: "Apple Store",
      description: "testing things",
      purchaseDate: new Date()
    },
  });

  revalidatePath("/dashboard");

  return NextResponse.json({ data: entry });
};
