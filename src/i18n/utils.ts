import type { langKeyType } from '@/types/data/returnType';
import { ui, defaultLang } from './ui';
import type { AstroGlobal } from 'astro';

export function getLangFromUrl(url: URL): langKeyType {
  const [, lang] = url.pathname.split('/');
  return lang in ui ? lang as langKeyType : defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    if (ui[lang]?.[key]) return ui[lang][key];

    if (ui[defaultLang]?.[key]) return ui[defaultLang][key];

    return key;
  };
}

export function useLang(Astro: AstroGlobal) {
  return getLangFromUrl(Astro.url);
}

export function useGetTranslations(Astro: AstroGlobal) {
  const lang = useLang(Astro);
  const t = useTranslations(lang)
  return {
    lang: lang,
    navnavigateBack: t('nav.nagivateBack'),
    tagnoFound: t('tagPost.noFound'),
    tagtotal: t('tagPost.total.1'),
    tagposts: t('tagPost.total.2'),
    navabout: t('nav.about'),
    navblog: t('nav.blog'),
    navhome: t('nav.home'),
    navform: t('nav.form'),
    searchCMDplaceholder: t('searchCMD.placeholder'),
    searchCMDcode: t('searchCMD.heading.code'),
    searchCMDpost: t('searchCMD.heading.post'),
    searchCMDempty: t('searchCMD.empty'),
    title404: t('404.title'),
    description404: t('404.description'),
    contactShowError: t('contact.form.showError'),
    contactSubmit: t('contact.form.submit'),
    contactPlaceholderCheckbox: t('contact.form.placeholderCheckBox'),
    contactFirstName: t('contact.form.placeholderFirstName'),
    contactLastName: t('contact.form.placeholderLastName'),
    contactMessage: t('contact.form.placeholderMessage'),
  }
}