import { prisma } from "../utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserNameFromClerkUser } from "../utils/user";

const createNewUser = async () => {
  const loggedInUser = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: loggedInUser!.id as string,
    },
  });

  console.log("--- match", match);
  console.log("--- loggedInUser", loggedInUser);
  if (!match) {
    console.log(`--- not found user, creating one`);
    const user = await prisma.user.create({
      data: {
        clerkId: loggedInUser!.id,
        email: loggedInUser ? getUserNameFromClerkUser(loggedInUser!) : "",
      },
    });
  }

  redirect("/dashboard");
};

const NewUserPage = async () => {
  await createNewUser();
  return <h1>New user page</h1>;
};

export default NewUserPage;
