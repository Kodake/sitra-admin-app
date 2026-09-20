import { getRequestConfig } from "next-intl/server";
import fs from "fs";
import path from "path";
import { getUserLocale } from "./services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  let messages: Record<string, any> = {};
  try {
    const filePath = path.join(process.cwd(), "public", "locales", `${locale}.json`);
    messages = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    messages = (await import(`../public/locales/${locale}.json`)).default;
  }

  return {
    locale,
    messages,
    onError(error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(error.message);
      }
    },
    getMessageFallback({ key, namespace }) {
      return `${namespace ? `${namespace}.` : ""}${key}`;
    },
  };
});