import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useOpenPettyCashValidationSchema = () => {
    const t = useTranslations("CashBoxes.PettyCash.validation");

    return Yup.object({
        openingAmount: Yup.number()
            .min(0, t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        comments: Yup.string()
            .nullable()
            .notRequired()
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters"))
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 100 })),
    });
};

export const useWithdrawalValidationSchema = () => {
    const t = useTranslations("CashBoxes.PettyCash.validation");

    return Yup.object({
        amount: Yup.number()
            .required(t("required"))
            .typeError(t("invalidNumberFormat"))
            .positive(t("positiveNumber"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .test(
                "not-greater-than-closingAmount",
                t("maxWithdrawal", { max: "${max}" }),
                function (value) {
                    const { closingAmount } = this.options.context || {};
                    if (value == null || closingAmount == null) return true;
                    return value <= closingAmount;
                }
            ),
    });
};
