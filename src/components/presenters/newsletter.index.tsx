import type { ContactPropsFormType } from "@/types";
import useNewsletterForm from "../container/useSubNewsletterForm";

export default function Newsletter({
  configTranslations,
}: ContactPropsFormType) {
  const { errorsSubNewsletter, onSubNewsletterSubmit, loading, isSuccess } =
    useNewsletterForm();
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
          onSubmit={async (e) =>
            await onSubNewsletterSubmit(e, configTranslations.lang)
          }
          className="h-[60dvh] flex flex-col justify-center items-center pt-1 px-4"
        >
          <h3 className="text-2xl/relaxed font-bold ">
            {configTranslations.newsletterTitle}
          </h3>
          <p className="text-foreground/75">
            {configTranslations.newsletterDescription}
          </p>
          <div className="border border-foreground rounded-full mt-4 flex flex-row justify-between pl-4 p-1">
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
              disabled={loading}
              className="cursor-pointer bg-accent text-foreground text-nowrap px-9 py-1 rounded-full"
            >
              {configTranslations.newsletterSubscribe}
            </button>
          </div>
          {errorsSubNewsletter && (
            <p className="text-destructive/75 mt-4">
              {errorsSubNewsletter as string}
            </p>
          )}
        </form>
      )}
    </>
  );
}
