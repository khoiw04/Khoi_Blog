import type { langKeyType } from "@/types";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { actions } from "astro:actions";
import { useRef, useState } from "react";
import type { ErrorResponse } from "resend";

export default function useNewsletterForm() {
  const [errors, setErrors] = useState<string | ErrorResponse | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

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
      turnstileRef.current?.reset(); // Reset để lấy token mới khi có lỗi
      setToken(null);
      return;
    }

    setIsSuccess(true);
    turnstileRef.current?.reset();
    setErrors("I think you've already subscribed before");
  };

  return {
    onSubNewsletterSubmit: onSubmit,
    errorsSubNewsletter: errors,
    setTurnstileToken: setToken,
    TurnstileToken: token,
    turnstileRef,
    isSuccess,
    loading,
  };
}
