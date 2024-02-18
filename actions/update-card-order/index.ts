"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) => {
      return prismadb.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId
            }
          }
        },
        data: {
          order: card.order,
          listId: card.listId
        }
      })
    })

    updatedCards = await prismadb.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reOrder."
    }   
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: updatedCards
  }
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);