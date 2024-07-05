// actions.ts
"use server";

import { z } from "zod";

// Define the schema for form validation using Zod
const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.endsWith("@zod.com"), {
      message: "Only @zod.com emails are allowed",
    }),
  username: z.string().min(5, "Username must be at least 5 characters long"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/\d/, "Password must contain at least one number"),
});

export async function handleForm(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    formSchema.parse(data);
    // Simulate a successful login after a delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2 second delay
    return {
      success: true,
      message: "Login successful!",
    };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        success: false,
        errors: e.errors.map((error) => error.message),
      };
    }
    return {
      success: false,
      errors: ["Unknown error occurred"],
    };
  }
}
