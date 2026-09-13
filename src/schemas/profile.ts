import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useProfileSchema = () => {
    const t = useTranslations("Login.validation");

    return Yup.object({
        userName: Yup.string()
            .required(t("required"))
            .min(3, t("min", { min: 3 }))
            .max(50, t("max", { max: 50 }))
            .test(
                "is-username-or-email",
                t("invalidCharacters"),
                (value) => {
                    if (!value) return true;

                    const isEmail = value.includes("@");

                    if (isEmail) {
                        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                    }
                    return /^[a-zA-Z0-9.]*$/.test(value);
                }
            ),
        province: Yup.string().nullable().notRequired(),
        municipality: Yup.string().nullable().notRequired(),
        address: Yup.string()
            .trim()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(100, t("max", { max: 100 })),
        phoneNumber: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 10 }),
                (value) => !value || value.length === 0 || value.length >= 10
            )
            .max(10, t("max", { max: 10 }))
            .matches(/^[0-9\s]*$/, t("justDigits")),
        certificate: Yup.mixed()
            .test("file-size", t("fileTooLarge"), (file) => {
                if (file && file instanceof File) {
                    return file.size <= 5 * 1024 * 1024; // 5MB
                }
                return true;
            })
            .test("file-type", t("invalidFileType"), (file) => {
                if (file && file instanceof File) {
                    return ["application/x-pkcs12"].includes(file.type);
                }
                return true;
            }),
        certificatePassword: Yup.string().nullable().notRequired(),
        companyLogo: Yup.mixed()
            .nullable()
            .notRequired()
            .test("file-size", t("fileTooLarge") || "File too large", (file) => {
                if (file && file instanceof File) {
                    return file.size <= 500 * 1024; // 500KB
                }
                return true;
            })
            .test("file-type", t("invalidFileType") || "Invalid file type", (file) => {
                if (file && file instanceof File) {
                    return ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
                }
                return true;
            }),
    });
};
