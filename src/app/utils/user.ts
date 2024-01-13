import { User } from "@clerk/nextjs/server";

export const getUserNameFromClerkUser = (user: User) => {
  if (user.emailAddresses.length > 0) {
    return user.emailAddresses[0].emailAddress;
  } else if (user.username) {
    return user.username;
  } else {
    return "no-user-name";
  }
};
