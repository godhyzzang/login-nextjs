// login/page.tsx
"use client";

import { useState } from "react";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { handleForm } from "./actions";

// Define the type for the state
interface State {
  errors: string[];
}

// Define the type for the result returned by handleForm
interface FormResult {
  success: boolean;
  message?: string;
  errors?: string[];
}

export default function LogIn() {
  const [state, setState] = useState<State>({ errors: [] });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const result: FormResult = await handleForm(state, formData);

    if (result.success) {
      // Handle successful login
      console.log(result.message);
      alert(result.message);
    } else {
      // Handle login failure
      console.error("Login failed!", result.errors);
      setState({ errors: result.errors ?? [] });
      alert((result.errors ?? []).join("\n"));
    }

    setSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state.errors.filter((error) =>
            error.toLowerCase().includes("email")
          )}
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state.errors.filter((error) =>
            error.toLowerCase().includes("username")
          )}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state.errors.filter((error) =>
            error.toLowerCase().includes("password")
          )}
        />
        <FormButton type="submit" text="Log in" />
      </form>

      <SocialLogin />
    </div>
  );
}
