import type { langKeyType } from "@/types";
import { ui, defaultLang } from "./ui";
import type { AstroGlobal } from "astro";

export function useTranslations(key: keyof typeof ui) {
  return function t(val: keyof (typeof ui)["vi" | "en"]) {
    if (ui[key]?.[val]) return ui[key][val];
    return ui[defaultLang][val];
  };
}

export function useLang(Astro: AstroGlobal) {
  const [, lang] = Astro.url.pathname.split("/");
  return lang in ui ? (lang as langKeyType) : defaultLang;
}

export function useGetTranslations(Astro: AstroGlobal) {
  const lang = useLang(Astro);
  const t = useTranslations(lang);
  return {
    lang: lang,
    navnavigateBack: t("nav.nagivateBack"),
    tagnoFound: t("tagPost.noFound"),
    tagtotal: t("tagPost.total.1"),
    tagposts: t("tagPost.total.2"),
    navabout: t("nav.about"),
    navblog: t("nav.blog"),
    navhome: t("nav.home"),
    navform: t("nav.form"),
    searchCMDplaceholder: t("searchCMD.placeholder"),
    searchCMDcode: t("searchCMD.heading.code"),
    searchCMDscience: t("searchCMD.heading.science"),
    searchCMDpost: t("searchCMD.heading.post"),
    searchCMDempty: t("searchCMD.empty"),
    title404: t("404.title"),
    description404: t("404.description"),
    contactShowError: t("contact.form.showError"),
    contactSubmit: t("contact.form.submit"),
    contactPlaceholderCheckbox: t("contact.form.placeholderCheckBox"),
    contactFirstName: t("contact.form.placeholderFirstName"),
    contactLastName: t("contact.form.placeholderLastName"),
    contactMessage: t("contact.form.placeholderMessage"),
    indexHeaderDescription: t("index.info.description"),
    indexNavBlog: t("index.nav.blog"),
    indexNavAbout: t("index.nav.about"),
    indexNavSend: t("index.nav.send"),
    newsletterTitle: t("newsletter.title"),
    newsletterDescription: t("newsletter.description"),
    newsletterSubscribe: t("newsletter.subscribe"),
    newsletterSuccess: t("newsletter.success"),
    unsubscribeButton: t("newsletter.unsubscribe.button"),
    unsubscribeDescription: t("newsletter.unsubscribe.description"),
    unsubscribeSuccess: t("newsletter.unsubscribe.success"),
    unsubscribeSuccessDescription: t(
      "newsletter.unsubscribe.success.description",
    ),
    unsubscribeError: t("newsletter.unsubscribe.error"),
  };
}
