"use server";

import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string) {
  await prismadb.board.delete({ where: { id } })

  revalidatePath(`/organization/org_2cJPVil1Y0IQjbh0epMp6dApq8r`)
}