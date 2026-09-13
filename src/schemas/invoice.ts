import { invoiceCondition } from "@/enums/appEnums";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useSaleInvoiceValidationSchema = () => {
    const t = useTranslations("Incomes.SaleInvoice.validation");

    const optionalStringId = Yup.string()
        .nullable()
        .notRequired()
        .test("valid-or-empty", t("invalid"), (value) => {
            return value === null || value === "" || typeof value === "string";
        });

    return Yup.object({
        currentDate: Yup.date().nullable(),
        dueDate: Yup.date().nullable(),
        pricingId: Yup.string().required(t("required")),
        currencyId: Yup.string().required(t("required")),
        warehouseId: Yup.string().required(t("required")),
        documentType: Yup.string().required(t("required")),
        fiscalSupportType: Yup.string().required(t("required")),
        customerId: Yup.string().required(t("required")),
        billerId: Yup.string().notRequired().nullable(),
        fiscalSupportId: Yup.string().notRequired().nullable(),
        fiscalSupportNumber: Yup.string().notRequired().nullable(),
        shipping: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        discount: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-discount", t("maxDiscount"), (value) => {
                if (value == null) return true;
                return value <= 100;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        grandTotal: Yup.number().notRequired().nullable(),
        totalAmountPaid: Yup.number().notRequired().nullable(),
        conditionType: Yup.string().required(t("required")),
        amountPaidMustBeGreater: Yup.string()
            .notRequired()
            .nullable()
            .test(
                "spot-payment",
                t("amountPaidMustBeGreatherThanTotal"),
                function (value, context) {
                    const { conditionType, grandTotal, totalAmountPaid } = context.parent;
                    if (Number(conditionType) === invoiceCondition.spot) {
                        return Number(totalAmountPaid) >= Number(grandTotal);
                    }
                    return true;
                }
            ),
        paymentMethod: Yup.array()
            .of(Yup.number().required(t("required")))
            .when("conditionType", (condition, schema) => {
                const type = Array.isArray(condition) ? condition[0] : condition;
                if (Number(type) === invoiceCondition.spot) {
                    return schema.min(1, t("required")).required(t("required"));
                }
                return schema.notRequired().nullable();
            })
            .default(null),
        payments: Yup.array()
            .of(
                Yup.object().shape({
                    paymentId: Yup.number().required(t("required")),
                    amount: Yup.number()
                        .positive(t("positiveNumber"))
                        .typeError(t("invalidNumberFormat"))
                        .test("max-decimals", t("decimalPlaces"), (value) => {
                            return value == null || /^\d+(\.\d{1,2})?$/.test(value as any);
                        })
                        .required(t("required")),
                })
            )
            .default([]),
        amountReturned: Yup.number().notRequired().nullable(),
        description: Yup.string().nullable(),
        note: Yup.string().nullable(),
        invoiceItems: Yup.array()
            .of(
                Yup.object().shape({
                    itemId: Yup.string().required(t("required")),
                    itemType: Yup.number().required(t("required")),
                    qty: Yup.number().required(t("required")).min(1, t("positiveNumber")),
                })
            )
            .min(1, t("atLeastOneItemInSaleInvoice"))
            .default([]),
    });
};

export const useNoteValidationSchema = () => {
    const t = useTranslations("Incomes.SaleInvoice.validation");

    const optionalStringId = Yup.string()
        .nullable()
        .notRequired()
        .test("valid-or-empty", t("invalid"), (value) => {
            return value === null || value === "" || typeof value === "string";
        });

    return Yup.object({
        currentDate: Yup.date().nullable(),
        dueDate: Yup.date().nullable(),
        pricingId: Yup.string().required(t("required")),
        currencyId: Yup.string().required(t("required")),
        warehouseId: Yup.string().required(t("required")),
        documentType: Yup.string().required(t("required")),
        fiscalSupportType: Yup.string().required(t("required")),
        customerId: Yup.string().required(t("required")),
        billerId: Yup.string().notRequired().nullable(),
        fiscalSupportId: Yup.string().notRequired().nullable(),
        fiscalSupportNumber: Yup.string().notRequired().nullable(),
        shipping: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        discount: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-discount", t("maxDiscount"), (value) => {
                if (value == null) return true;
                return value <= 100;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        grandTotal: Yup.number().notRequired().nullable(),
        totalAmountPaid: Yup.number().notRequired().nullable(),
        conditionType: Yup.string().required(t("required")),
        amountPaidMustBeGreater: Yup.string()
            .notRequired()
            .nullable()
            .test(
                "spot-payment",
                t("amountPaidMustBeGreatherThanTotal"),
                function (value, context) {
                    const { conditionType, grandTotal, totalAmountPaid } = context.parent;
                    if (Number(conditionType) === invoiceCondition.spot) {
                        return Number(totalAmountPaid) >= Number(grandTotal);
                    }
                    return true;
                }
            ),
        paymentMethod: Yup.array()
            .of(Yup.number().required(t("required")))
            .when("conditionType", (condition, schema) => {
                const type = Array.isArray(condition) ? condition[0] : condition;
                if (Number(type) === invoiceCondition.spot) {
                    return schema.min(1, t("required")).required(t("required"));
                }
                return schema.notRequired().nullable();
            })
            .default(null),
        payments: Yup.array()
            .of(
                Yup.object().shape({
                    paymentId: Yup.number().required(t("required")),
                    amount: Yup.number()
                        .positive(t("positiveNumber"))
                        .typeError(t("invalidNumberFormat"))
                        .test("max-decimals", t("decimalPlaces"), (value) => {
                            return value == null || /^\d+(\.\d{1,2})?$/.test(value as any);
                        })
                        .required(t("required")),
                })
            )
            .default([]),
        amountReturned: Yup.number().notRequired().nullable(),
        description: Yup.string().nullable(),
        note: Yup.string().nullable(),
        invoiceItems: Yup.array()
            .of(
                Yup.object().shape({
                    itemId: Yup.string().required(t("required")),
                    itemType: Yup.number().required(t("required")),
                    qty: Yup.number().required(t("required")).min(1, t("positiveNumber")),
                })
            )
            .min(1, t("atLeastOneItemInSaleInvoice"))
            .default([]),
    });
};

export const usePurchaseInvoiceValidationSchema = () => {
    const t = useTranslations("Expenses.PurchaseInvoice.validation");

    return Yup.object({
        currentDate: Yup.date().nullable(),
        dueDate: Yup.date().nullable(),
        pricingId: Yup.string().required(t("required")),
        currencyId: Yup.string().required(t("required")),
        warehouseId: Yup.string().required(t("required")),
        supplierId: Yup.string().required(t("required")),
        documentType: Yup.string().required(t("required")),
        fiscalSupportType: Yup.string().required(t("required")),
        fiscalSupportId: Yup.string().notRequired().nullable(),
        shipping: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        discount: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-discount", t("maxDiscount"), (value) => {
                if (value == null) return true;
                return value <= 100;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        conditionType: Yup.string().required(t("required")),
        paymentMethod: Yup.string().when("conditionType", (condition, schema) => {
            const type = Array.isArray(condition) ? condition[0] : condition;
            if (Number(type) === invoiceCondition.spot) {
                return schema.required(t("required"));
            }
            return schema.notRequired().nullable();
        }),
        description: Yup.string().nullable(),
        note: Yup.string().nullable(),
        invoiceItems: Yup.array()
            .of(
                Yup.object().shape({
                    itemId: Yup.string().required(t("required")),
                    itemType: Yup.number().required(t("required")),
                    qty: Yup.number().required(t("required")).min(1, t("positiveNumber")),
                })
            )
            .min(1, t("atLeastOneItemInPurchaseInvoice"))
            .default([]),
    });
};

export const useQuotationValidationSchema = () => {
    const t = useTranslations("Incomes.Quotation.validation");

    return Yup.object({
        currentDate: Yup.date().nullable(),
        dueDate: Yup.date().nullable(),
        pricingId: Yup.string().required(t("required")),
        currencyId: Yup.string().required(t("required")),
        warehouseId: Yup.string().required(t("required")),
        customerId: Yup.string().notRequired().nullable(),
        billerId: Yup.string().notRequired().nullable(),
        quotationNumber: Yup.string().nullable(),
        shipping: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        discount: Yup.number()
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            )
            .test("is-valid", t("invalidNumberFormat"), (value) => {
                if (value == null) return true;
                return typeof value === "number" && !isNaN(value);
            })
            .test("positive-number", t("positiveNumber"), (value) => {
                if (value == null) return true;
                return value >= 0;
            })
            .test("max-discount", t("maxDiscount"), (value) => {
                if (value == null) return true;
                return value <= 100;
            })
            .test("max-decimals", t("decimalPlaces"), (value) => {
                if (value == null) return true;
                return /^\d+(\.\d{1,2})?$/.test(value as any);
            }),
        invoiceItems: Yup.array()
            .of(
                Yup.object().shape({
                    itemId: Yup.string().required(t("required")),
                    itemType: Yup.string().required(t("required")),
                    qty: Yup.number().required(t("required")).min(1, t("positiveNumber")),
                })
            )
            .min(1, t("atLeastOneItemInSaleInvoice"))
            .default([]),
    });
};

export const useSalesValidationSchema = () => {
    const t = useTranslations("Incomes.SpotPayment.validation");

    return Yup.object({
        from: Yup.date().typeError(t("invalidDate")).required(t("fromRequired")),
        to: Yup.date()
            .typeError(t("invalidDate"))
            .min(Yup.ref("from"), t("toAfterFrom"))
            .required(t("toRequired")),
    });
};
