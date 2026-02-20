import type { langKeyType } from "@/types";
import { actions } from "astro:actions";
import { useState } from "react";
import type { ErrorResponse } from "resend";

export default function useNewsletterForm() {
  const [errors, setErrors] = useState<string | ErrorResponse | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    lang: langKeyType,
  ) => {
    e.preventDefault();
    setErrors(undefined);

    if (!token) {
      setErrors("Turnstile token is required");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { data, error } =
      lang === "vi"
        ? await actions.subNewsletterVi(formData)
        : await actions.subNewsletterEn(formData);

    setLoading(false);

    if (error) {
      setErrors(error.message);
      return;
    }

    if (data) {
      setErrors(data);
    } else {
      setIsSuccess(true);
    }
  };

  return {
    onSubNewsletterSubmit: onSubmit,
    errorsSubNewsletter: errors,
    setTurnstileToken: setToken,
    isSuccess,
    loading,
  };
}
