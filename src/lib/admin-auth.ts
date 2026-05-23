import { auth } from "@clerk/nextjs/server";

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}

export async function isAdmin() {
  const { userId } = await auth();
  return Boolean(userId);
}
