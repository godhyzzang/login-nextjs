// interface FormButtonProps {
//   loading: boolean;
//   text: string;
// }

// export default function FormButton({ loading, text }: FormButtonProps) {
//   return (
//     <button
//       disabled={loading}
//       className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
//     >
//       {loading ? "로딩 중" : text}
//     </button>
//   );
// }

"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
