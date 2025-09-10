import type { langKeyType } from '@/types/data/returnType';
import { ui, defaultLang } from './ui';
import type { AstroGlobal } from 'astro';

export function getLangFromUrl(url: URL): langKeyType {
  const [, lang] = url.pathname.split('/');
  return lang in ui ? lang : defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
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
    navigateBack: t('nav.nagivateBack'),
    noFound: t('tagPost.noFound'),
    total: t('tagPost.total.1'),
    posts: t('tagPost.total.2'),
    about: t('nav.about'),
    blog: t('nav.blog'),
    home: t('nav.home'),
    placeholder: t('searchCMD.placeholder'),
    code: t('searchCMD.heading.code'),
    post: t('searchCMD.heading.post'),
    empty: t('searchCMD.empty')
  }
}