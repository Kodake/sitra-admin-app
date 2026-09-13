import { TaxType } from "@/enums/appEnums";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useCurrencyValidationSchema = () => {
    const t = useTranslations("Finances.Currency.validation");

    return Yup.object({
        code: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(20, t("max", { max: 20 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        symbol: Yup.string()
            .required(t("required"))
            .min(1, t("min", { min: 1 }))
            .max(3, t("max", { max: 3 }))
            .matches(/^(?!.*[\d\s])[\S]{1,3}$/, t("invalidCharacters")),
        rate: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
    });
};

export const useExpenseValidationSchema = () => {
    const t = useTranslations("Finances.Expense.validation");

    return Yup.object({
        date: Yup.date().required(t("required")),
        description: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        amount: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
    });
};

export const useTaxValidationSchema = () => {
    const t = useTranslations("Finances.Tax.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),

        taxType: Yup.number()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
            .required(t("required"))
            .oneOf([TaxType.itbis, TaxType.isc, TaxType.otro, TaxType.exento, TaxType.noFacturable, TaxType.isr], t("invalidTaxType"))
            .nullable(),

        amount: Yup.number()
            .typeError(t("invalidNumberFormat"))
            .required(t("required"))
            // Validación de decimales
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value.toString())
            )
            // Lógica dinámica basada en taxType
            // Nota: Se usa [taxType] para desestructurar el array que Yup pasa ahora
            .when("taxType", ([taxType], schema) => {
                if (taxType === null || taxType === undefined) {
                    // Comportamiento para cuando no hay tipo de impuesto (ej. gasto general)
                    return schema.positive(t("positiveNumber"));
                }

                switch (taxType) {
                    case TaxType.itbis: // Asumiendo que 1 es TaxType.itbis
                        return schema.oneOf([0, 16, 18], t("invalidITBISRate"));

                    case TaxType.isc: // Asumiendo que 2 es TaxType.isc
                        return schema
                            .min(0, t("positiveNumber"))
                            .max(100, t("invalidRange"));
                    case TaxType.exento: // Asumiendo que 4 es TaxType.exento
                        return schema
                            .min(0, t("positiveNumber"))
                            .max(0, t("invalidRange"));
                    case TaxType.noFacturable: // Asumiendo que 5 es TaxType.noFacturable
                        return schema
                            .min(0, t("positiveNumber"))
                            .max(0, t("invalidRange"));
                    case TaxType.isr: // Asumiendo que 6 es TaxType.isr
                        return schema.oneOf([10], t("invalidISRRate"));

                    default:
                        return schema.min(0, t("positiveNumber"));
                }
            }),
    });
};

export const usePaymentReceiptValidationSchema = () => {
    const t = useTranslations("Accounts.Receivable.validation");

    return Yup.object({
        paymentMethod: Yup.string().required(t("required")),
        amount: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
    });
};
