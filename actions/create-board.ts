"use server";

import { prismadb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';

export type State = {
  errors?: {
    title?: string[];
  },
  message?: string | null
}

const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required"
  })
})

export async function create(prevState: State, formData: FormData) {
  const validateFields = CreateBoard.safeParse({
    title: formData.get('title'),
  })
  // const title = formData.get("title") as string;

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Missing fields."
    }
  }

  const { title } = validateFields.data;

  try {
    await prismadb.board.create({
      data: {
        title
      }
    })
  } catch (error) {
    return {
      message: "Database Error"
    }
  }

  revalidatePath(`/organization/org_2cJPVil1Y0IQjbh0epMp6dApq8r`)
  redirect(`/organization/org_2cJPVil1Y0IQjbh0epMp6dApq8r`)
}