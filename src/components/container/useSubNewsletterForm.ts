import type { langKeyType } from "@/types";
import { actions } from "astro:actions";
import { useState } from "react";
import type { ErrorResponse } from "resend";

export default function useNewsletterForm() {
  const [errors, setErrors] = useState<string | ErrorResponse | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    lang: langKeyType,
  ) => {
    e.preventDefault();
    setErrors(undefined);
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
    isSuccess,
    loading,
  };
}
