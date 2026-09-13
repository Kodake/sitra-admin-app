import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useServiceValidationSchema = () => {
    const t = useTranslations("Products.Product.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        reference: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        description: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        basePrice: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        taxIds: Yup.array().of(Yup.string().required()).default([]),
        categoryId: Yup.string().notRequired().nullable(),
        subCategoryId: Yup.string().notRequired().nullable(),
        unitMeasure: Yup.string().notRequired().nullable(),
    });
};

export const useProductValidationSchema = () => {
    const t = useTranslations("Products.Product.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        reference: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 50 })),

        barcode: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 50 })),
        description: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        initialCost: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        basePrice: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        taxIds: Yup.array().of(Yup.string().required()).default([]),
        brandId: Yup.string().notRequired().nullable(),
        modelId: Yup.string().notRequired().nullable(),
        categoryId: Yup.string().notRequired().nullable(),
        subCategoryId: Yup.string().notRequired().nullable(),
        unitMeasure: Yup.string().notRequired().nullable(),
        warehouseId: Yup.string().notRequired().nullable(),
    });
};

export const useComboValidationSchema = () => {
    const t = useTranslations("Products.Combo.validation");

    return Yup.object({
        items: Yup.array()
            .of(
                Yup.object({
                    id: Yup.string().required(t("required")),
                    qty: Yup.number().required(t("required")).min(1, t("positiveNumber")),
                })
            )
            .min(2, t("minItems", { min: 2 }))
            .required(t("required"))
            .default([]),
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        reference: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 50 })),

        barcode: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(50, t("max", { max: 50 })),
        description: Yup.string()
            .nullable()
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length === 0 || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        initialCost: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        basePrice: Yup.number()
            .positive(t("positiveNumber"))
            .typeError(t("invalidNumberFormat"))
            .test(
                "max-decimals",
                t("decimalPlaces"),
                (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
            )
            .required(t("required")),
        taxIds: Yup.array().of(Yup.string().required()).default([]),
        brandId: Yup.string().notRequired().nullable(),
        modelId: Yup.string().notRequired().nullable(),
        categoryId: Yup.string().notRequired().nullable(),
        subCategoryId: Yup.string().notRequired().nullable(),
        unitMeasure: Yup.string().notRequired().nullable(),
        warehouseId: Yup.string().notRequired().nullable(),
    });
};

export const useCategoryValidationSchema = () => {
    const t = useTranslations("Products.Category.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        description: Yup.string()
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

export const useSubCategoryValidationSchema = () => {
    const t = useTranslations("Products.SubCategory.validation");

    return Yup.object({
        categoryId: Yup.string().required(t("required")),
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        description: Yup.string()
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

export const useBrandValidationSchema = () => {
    const t = useTranslations("Products.Brand.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
    });
};

export const useModelValidationSchema = () => {
    const t = useTranslations("Products.Model.validation");

    return Yup.object({
        brandId: Yup.string().required(t("required")),
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(50, t("max", { max: 50 }))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters")),
        description: Yup.string()
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