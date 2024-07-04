// actions.ts
"use server";

export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password") as string;

  if (password === "12345") {
    // Simulate a successful login after a delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2 second delay
    return {
      success: true,
      message: "Login successful!",
    };
  } else {
    // Simulate a failed login after a delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating a 2 second delay
    return {
      success: false,
      errors: ["Wrong password"],
    };
  }
}
