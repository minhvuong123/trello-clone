"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  console.log("client ID: ", data)

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id, boardId } = data;
  let card;

  try {

    card = await prismadb.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to delete card."
    }   
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: card
  }
}

export const deleteCard = createSafeAction(DeleteCard, handler);