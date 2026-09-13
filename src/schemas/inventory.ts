import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useWarehouseValidationSchema = () => {
    const g = useTranslations("General");
    const t = useTranslations("Warehouses.Warehouse.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        address: Yup.string()
            .required(t("required"))
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        phone: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 10 }),
                (value) => !value || value.length === 0 || value.length >= 10
            )
            .max(10, t("max", { max: 10 }))
            .matches(/^[0-9\s]*$/, g("justDigits")),
        email: Yup.string()
            .nullable()
            .email()
            .test(
                "is-valid-length",
                t("min", { min: 5 }),
                (value) => !value || value.length === 0 || value.length >= 5
            )
            .max(50, t("max", { max: 50 })),
        city: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        country: Yup.string()
            .nullable()
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        zipCode: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 5 }),
                (value) => !value || value.length === 0 || value.length >= 5
            )
            .max(5, t("max", { max: 5 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
    });
};

export const useStockValidationSchema = () => {
    const t = useTranslations("Warehouses.Stock.validation");

    return Yup.object({
        itemId: Yup.string().required(t("required")),
        warehouseId: Yup.string().required(t("required")),
        qty: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        minQty: Yup.number()
            .nullable()
            .notRequired()
            .test(
                "positiveNumber",
                t("positiveNumber"),
                (value) => value == null || value >= 0 || value === 0
            )
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            ),
        maxQty: Yup.number()
            .nullable()
            .notRequired()
            .test(
                "positiveNumber",
                t("positiveNumber"),
                (value) => value == null || value >= 0 || value === 0
            )
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            ),
    });
};

export const useStockReportValidationSchema = () => {
    const t = useTranslations("Reports.Stocks.validation");

    return Yup.object({
        warehouseIds: Yup.array()
            .of(Yup.string().required(t("required")))
            .min(1, t("required"))
            .required(t("required")),
    });
};

export const useTransferValidationSchema = () => {
    const t = useTranslations("Warehouses.Transfer.validation");

    return Yup.object({
        productId: Yup.string().required(t("required")),
        originWarehouseId: Yup.string().required(t("required")),
        destinationWarehouseId: Yup.string().required(t("required")),
        qty: Yup.number()
            .typeError(t("invalidNumberFormat"))
            .positive(t("positiveNumber"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .test(
                "initial-less-than-final",
                t("qtyMustBeLessThanAvailableQty"),
                function (value) {
                    const { availableQty } = this.parent;
                    if (value == null || availableQty == null) return true;
                    return value <= availableQty;
                }
            )
            .required(t("required")),
        availableQty: Yup.number().required(t("required")),
        comments: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
    });
};
