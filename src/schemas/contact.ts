import { identificationType } from "@/enums/appEnums";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useContactValidationSchema = () => {
    const g = useTranslations("General");
    const t = useTranslations("Contacts.validation");

    return Yup.object({
        contactType: Yup.string().nullable().notRequired(),
        identificationType: Yup.string().nullable().notRequired(),
        province: Yup.string().nullable().notRequired(),
        municipality: Yup.string().nullable().notRequired(),
        identification: Yup.string().when(
            "identificationType",
            (idenType, schema) => {
                const type = Array.isArray(idenType) ? idenType[0] : idenType;
                if (type == identificationType.identifier) {
                    return schema
                        .length(11, t("length", { length: 11 }))
                        .matches(/^\d+$/, g("justDigits"))
                        .required(t("required"));
                }
                if (type == identificationType.rnc) {
                    return schema
                        .length(9, t("length", { length: 9 }))
                        .matches(/^\d+$/, g("justDigits"))
                        .required(t("required"));
                }
                if (type == identificationType.passport) {
                    return schema
                        .min(6, t("min", { min: 6 }))
                        .max(9, t("max", { max: 9 }))
                        .matches(/^[A-Za-z0-9]+$/, t("alphanumeric"))
                        .required(t("required"));
                }
                return schema.notRequired().nullable();
            }
        ),
        name: Yup.string()
            .trim()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 })),
        address: Yup.string()
            .trim()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(100, t("max", { max: 100 })),
        phone: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 10 }),
                (value) => !value || value.length === 0 || value.length >= 10
            )
            .max(10, t("max", { max: 10 }))
            .matches(/^[0-9\s]*$/, g("justDigits"))
            .test("phone-different", t("phoneDifferent"), function (value) {
                const { phone2 } = this.parent;
                return !value || !phone2 || value !== phone2;
            }),
        phone2: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 10 }),
                (value) => !value || value.length === 0 || value.length >= 10
            )
            .max(10, t("max", { max: 10 }))
            .matches(/^[0-9\s]*$/, g("justDigits"))
            .test("phone-different", t("phoneDifferent"), function (value) {
                const { phone } = this.parent;
                return !value || !phone || value !== phone;
            }),
        email: Yup.string()
            .nullable()
            .email()
            .test(
                "is-valid-length",
                t("min", { min: 5 }),
                (value) => !value || value.length === 0 || value.length >= 5
            )
            .max(50, t("max", { max: 50 })),
    });
};
