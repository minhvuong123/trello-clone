import { prismadb } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { cardId: string } }) {
  console.log("asoduoaiudoasdu", params)
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthozied", { status: 401 }) 
    }

    const card = await prismadb.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId
          }
        }
      },
      include: {
        list: {
          select: {
            title: true
          }
        }
      }
    })

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 })
  }
}