"use server";

import { auth } from "@clerk/nextjs/server";

export const createStripeCheckout = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Simular a criação de uma sessão de checkout
  return { sessionId: "fake-session-id" };
};
