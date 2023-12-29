import { prisma } from "../utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const loggedInUser = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: loggedInUser!.id as string,
    },
  });

  if (!match) {
    const user = await prisma.user.create({
      data: {
        clerkId: loggedInUser!.id,
        email: loggedInUser!.emailAddresses[0].emailAddress,
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
