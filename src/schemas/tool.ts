import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useDeadlineValidationSchema = () => {
    const g = useTranslations("General");
    const t = useTranslations("Tools.Deadline.validation");

    return Yup.object({
        name: Yup.string()
            .trim()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        days: Yup.number()
            .required(t("required"))
            .typeError(g("justDigits"))
            .min(0, t("nonNegativeNumber", { min: 0 }))
            .max(3650, t("maxDays", { max: 3650 }))
            .test("max-days", t("maxDays", { max: 3650 }), (value) => value <= 3650),
    });
};

export const useFiscalSupportValidationSchema = () => {
    const t = useTranslations("Tools.FiscalSupport.validation");

    return Yup.object({
        documentType: Yup.string().required(t("required")),
        fiscalSupportType: Yup.string().required(t("required")),
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 })),
        warehouseId: Yup.string().required(t("required")),
        initialSequence: Yup.number()
            .min(0, t("nonNegativeNumber"))
            .integer(t("invalidNumberFormat"))
            .typeError(t("invalidNumberFormat"))
            .required(t("required"))
            .test(
                "is-non-negative-integer",
                t("invalidNumberFormat"),
                value => value == null || /^\d+$/.test(value.toString())
            ),
        finalSequence: Yup.number()
            .min(0, t("nonNegativeNumber"))
            .integer(t("invalidNumberFormat"))
            .typeError(t("invalidNumberFormat"))
            .required(t("required"))
            .test(
                "is-non-negative-integer",
                t("invalidNumberFormat"),
                value => value == null || /^\d+$/.test(value.toString())
            )
            .test(
                "max-8-digits",
                t("maxFinalSequence"),
                value => {
                    if (value == null) return true;
                    return value.toString().length <= 8;
                }
            )
            .test(
                "final-greater-than-initial",
                t("finalMustBeGreaterThanInitial"),
                function (value) {
                    const { initialSequence } = this.parent;
                    if (value == null || initialSequence == null) return true;

                    return value > initialSequence;
                }
            ),
    });
};

export const useRoleValidationSchema = () => {
    const t = useTranslations("Tools.Role.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 })),
        description: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(100, t("max", { max: 100 })),
    });
};