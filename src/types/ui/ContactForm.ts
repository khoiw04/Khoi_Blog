import type { useGetTranslationsType } from "../func/returnType";

export interface AstroFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  ['astro:action']?: unknown;
}

export type ContactPropsFormType = {configTranslations: useGetTranslationsType}