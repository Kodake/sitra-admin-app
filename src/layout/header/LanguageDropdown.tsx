import { Locale } from "@/config";
import { language } from "@/enums/appEnums";
import { changeLanguage } from "@/services/authServices";
import { setUserLocale } from "@/services/locale";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

const LanguageDropdown = () => {
  const g = useTranslations("General");
  const [, startTransition] = useTransition();

  function handleChange(locale: Locale) {
    const lang = locale === "en" ? language.EN : language.ES;
    changeLanguage({ language: lang }).catch(() => {});

    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <ul>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChange("en");
          }}
        >
          {g("en")}
        </a>
      </li>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleChange("es");
          }}
        >
          {g("es")}
        </a>
      </li>
    </ul>
  );
};

export default LanguageDropdown;
