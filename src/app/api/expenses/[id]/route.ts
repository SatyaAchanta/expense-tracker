import { getUserByClerkId } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// export const PATCH = async (req: Request, { params }) => {
//   const { content } = await req.json();
//   const user = await getUserByClerkId();

//   const updatedExpense = await prisma.expense.update({
//     where: {
//       userId_id: {
//         id: params.id,
//         userId: user.id,
//       },
//     },
//     data: {
//       content,
//     },
//   });

//   revalidatePath("/dashboard");

//   return NextResponse.json({ data }`/expenses/${expense.id}`);
// };

export const DELETE = async (req: Request, { params }) => {
  const user = await getUserByClerkId();

  console.log("---- before delete");

  await prisma.expense.delete({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
  });

  console.log(`----- after delete`);

  revalidatePath("/dashboard");

  return NextResponse.json({ data: "success" });
};
