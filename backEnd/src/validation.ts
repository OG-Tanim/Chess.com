import * as z from "zod";

export const Move = z.strictObject({
  from: z.string().trim().nonempty(),
  to: z.string().trim().nonempty(),
});
