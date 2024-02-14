import { getUserByClerkId } from "../../utils/auth";
import { prisma } from "../../utils/db";

import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const user = await getUserByClerkId();
  // const searchOn: string = req.nextUrl.searchParams.get("searchOn");
  // const searchVal = req.nextUrl.searchParams.get("searchVal");

  const expenses = await prisma.expense.findMany({
    where: {
      userId: user.id,
    },
    orderBy: [{
      purchaseDate: "desc",
    }, {
      createdAt: "desc",
    }],
  });

  // console.log("--- searchOn", searchOn);
  // console.log("--- searchVal", searchVal);

  // if (searchOn !== "" && searchVal) {
  //   console.log("--- yes search values exist");
  //   console.log(searchOn, searchVal);
  //   expenses = await prisma.expense.findMany({
  //     where: {
  //       userId: user.id,
  //       [searchOn]: {
  //         contains: searchVal,
  //         mode: "insensitive",
  //       },
  //     },
  //     orderBy: {
  //       purchaseDate: "desc",
  //     },
  //   });
  // } else {
  //   expenses = await prisma.expense.findMany({
  //     where: {
  //       userId: user.id,
  //     },
  //     orderBy: {
  //       purchaseDate: "desc",
  //     },
  //   });
  // }

  // expenses = await prisma.expense.findMany({
  //   where: {
  //     userId: user.id,
  //   },
  //   orderBy: {
  //     purchaseDate: "desc",
  //   },
  //   take: 10,
  // });

  // if (expenses) {
  //   // TODO
  // }

  // revalidatePath("/dashboard");

  return NextResponse.json({ data: expenses });
};
