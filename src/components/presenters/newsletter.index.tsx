import type { ContactPropsFormType } from "@/types";
import { Turnstile } from "@marsidev/react-turnstile";
import useNewsletterForm from "../container/useSubNewsletterForm";

export default function Newsletter({
  configTranslations,
}: ContactPropsFormType) {
  const {
    errorsSubNewsletter,
    setTurnstileToken,
    onSubNewsletterSubmit,
    loading,
    isSuccess,
    turnstileRef,
    TurnstileToken,
  } = useNewsletterForm();

  return (
    <>
      {isSuccess ? (
        <div className="h-[60dvh] flex flex-col gap-4 justify-center items-center pt-1 px-4">
          <p className="text-success/75">
            {configTranslations.newsletterSuccess}
          </p>
          <img
            src="https://media1.tenor.com/m/KM3VNP5d1FIAAAAd/miku-hello.gif"
            alt="miku gif thank you"
            className="h-1/2 mb-9 px-8"
          />
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await onSubNewsletterSubmit(e, configTranslations.lang);
          }}
          className="h-[60dvh] flex flex-col justify-center items-center pt-1 px-4"
        >
          <div className="relative flex flex-col items-center">
            <h3 className="text-2xl/relaxed font-bold ">
              {configTranslations.newsletterTitle}
            </h3>
            <p className="text-foreground/75">
              {configTranslations.newsletterDescription}
            </p>
            <div className="border border-foreground w-3/4 self-center rounded-full mt-4 flex flex-row justify-between pl-4 p-1">
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="hello@mail.com"
                className="w-full block focus:outline-none pr-4"
              />
              <button
                type="submit"
                disabled={loading || !TurnstileToken}
                className="cursor-pointer bg-accent disabled:bg-accent/50 disabled:text-foreground/50 disabled:cursor-not-allowed text-foreground text-nowrap px-9 py-1 rounded-full"
              >
                {configTranslations.newsletterSubscribe}
              </button>
            </div>
            {errorsSubNewsletter && (
              <p className="text-destructive/75 mt-4">
                {errorsSubNewsletter as string}
              </p>
            )}
            {configTranslations.lang === "en" && (
              <p className="text-foreground/75 mt-4 text-sm w-2/4">
                (You only can get EN newsletter, if you want to get both EN/VI
                newsletter, please click{" "}
                <a href="/vi" className="underline">
                  here
                </a>{" "}
                to subscribe)
              </p>
            )}
            <Turnstile
              onSuccess={(token) => setTurnstileToken(token)}
              siteKey={"0x4AAAAAACfzkxzcb-bAWZo2"}
              className="mt-4 absolute sr-only top-full left-1/2 -translate-x-1/2 translate-y-1/3"
              onExpire={() => {
                setTurnstileToken(null);
                turnstileRef.current?.reset();
              }}
              options={{
                theme: "auto",
                appearance: "execute",
              }}
            />
          </div>
        </form>
      )}
    </>
  );
}
