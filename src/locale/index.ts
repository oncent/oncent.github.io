import { useLocalStorage } from "@vueuse/core";
import { createI18n, type I18n } from "vue-i18n";
export const getLocaleZh = () => import("./lang/zh.json");
export const getLocaleEn = () => import("./lang/en.json");

export const locales = [
  {
    name: "zh",
    fetcher: getLocaleZh,
    matcher: (_l: string) => _l.includes("zh-CN"),
    label: "中文-简体",
  },
  {
    name: "en",
    fetcher: getLocaleEn,
    matcher: (_l: string) => true,
    label: "English",
  },
] as const;

export const getBrowserLang = function () {
  const browserLang: string = navigator.language
    ? navigator.language
    : (navigator as any).browserLanguage;
  return locales.find((x) => x.matcher(browserLang))?.name ?? locales[0].name;
};

export const localLanguage = useLocalStorage("lang", getBrowserLang());

export const i18n = createI18n({
  locale: localLanguage.value,
  fallbackLocale: "en",
});

export const { t } = i18n.global;

export const switchLanguage = async (name: string) => {
  if (i18n) {
    const locale = locales.find((l) => l.name === name);
    if (locale) {
      if (i18n.global.availableLocales.includes(name)) {
        i18n.global.locale = name;
        return;
      }
      const { default: messages } = await locale.fetcher();
      i18n.global.setLocaleMessage(name, messages);
      i18n.global.locale = name;
      document.title = t("APP_NAME");
    }
  }
};

export const initI18n = async () => {
  const locale = locales.find((l) => l.name === localLanguage.value)!;
  const { default: messages } = await locale.fetcher();
  i18n.global.setLocaleMessage(localLanguage.value, messages);
  i18n.global.locale = localLanguage.value;
  document.title = t("APP_NAME");
  return i18n;
};
