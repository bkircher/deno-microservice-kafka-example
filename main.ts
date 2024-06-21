import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";

export {};

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const main = (): number => {
  try {
    const data = schema.parse({ name: "John Doe", age: "30" });
    console.log(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.errors);
      return 2;
    }
    console.error(error);
    return 1;
  }
  console.log("Hello, World!");
  return 0;
};

Deno.exit(main());
