// login/page.tsx
"use client";

import { useState } from "react";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function LogIn() {
  const [state, action] = useFormState(handleForm, null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.target);
    const result = await handleForm(state, formData);

    if (result.success) {
      // Handle successful login
      console.log(result.message);
      alert(result.message);
    } else {
      // Handle login failure
      console.error("Login failed!", result.errors);
      alert(result.errors?.join("\n"));

      // Update state with errors if needed
      // action({
      //   errors: result.errors,
      // });
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
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton
          type="submit"
          text={submitting ? "Logging in..." : "Log in"}
          //disabled={submitting}
        />
      </form>

      <SocialLogin />
    </div>
  );
}
