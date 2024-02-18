import { z } from "zod";

export const CreateCard = z.object({
  title: z.string({
    required_error: "Title card is required",
    invalid_type_error: "Title card is required"
  }).min(3, {
    message: "Title card is too short"
  }),
  boardId: z.string(),
  listId: z.string()
})