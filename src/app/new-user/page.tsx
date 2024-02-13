import { prisma } from "../utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserNameFromClerkUser } from "../utils/user";

const createNewUser = async () => {
  const loggedInUser = await currentUser();
  console.log("---- loggedInUser ----", loggedInUser);
  const match = await prisma.user.findUnique({
    where: {
      clerkId: loggedInUser!.id as string,
    },
  });

  if (!match) {
    console.log("----no match----");
    const user = await prisma.user.create({
      data: {
        clerkId: loggedInUser!.id,
        email: loggedInUser ? getUserNameFromClerkUser(loggedInUser!) : "",
      },
    });
  }

  console.log("---- just before redirect ----");
  redirect("/dashboard");
};

const NewUserPage = async () => {
  await createNewUser();
  return <h1>New user page</h1>;
};

export default NewUserPage;
