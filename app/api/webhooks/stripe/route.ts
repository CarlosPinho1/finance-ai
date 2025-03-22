import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  // Obter os dados do corpo da requisição
  const body = await request.json();

  // Verificar se os dados necessários estão presentes
  const { clerkUserId, action } = body;
  if (!clerkUserId || !action) {
    return NextResponse.error();
  }

  // Gerenciar ações de upgrade ou downgrade
  switch (action) {
    case "upgrade": {
      // Atualizar o usuário para o plano premium
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          subscriptionStatus: "active",
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }
    case "downgrade": {
      // Remover o plano premium do usuário
      await clerkClient.users.updateUser(clerkUserId, {
        privateMetadata: {
          subscriptionStatus: "inactive",
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
    default: {
      return NextResponse.error();
    }
  }

  return NextResponse.json({ message: "Plano atualizado com sucesso!" });
};
