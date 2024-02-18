import { z } from "zod";

export const CreateList = z.object({
  title: z.string({
    required_error: "Title list is required",
    invalid_type_error: "Title list is required"
  }).min(3, {
    message: "Title list is too short"
  }),
  boardId: z.string()
})