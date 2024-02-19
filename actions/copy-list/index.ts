"use server"

import { auth } from "@clerk/nextjs"
import { InputType, ReturnType } from "./types"
import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { createAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  console.log("client ID: ", data)

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    }
  }

  const { id, boardId } = data;
  let list;

  try {
    const listToCopy = await prismadb.list.findUnique({
      where: {
        id, 
        boardId,
        board: {
          orgId
        }
      },
      include: {
        cards: true
      }
    })

    if (!listToCopy) {
      return {
        error: "List not found."
      }
    }

    const lastList = await prismadb.list.findFirst( {
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true }
    })

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await prismadb.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - copy`,
        order: newOrder,
        cards: {
          create: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })) 
        }
      },
      include: {
        cards: true
      }
    })

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE
    })
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to copy list."
    }   
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list
  }
}

export const copyList = createSafeAction(CopyList, handler);