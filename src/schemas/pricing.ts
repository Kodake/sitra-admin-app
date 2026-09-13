import { pricingType } from "@/enums/appEnums";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const usePricingItemValidationSchema = () => {
    const t = useTranslations("Products.PricingItem.validation");

    return Yup.object({
        pricingId: Yup.string().required(t("required")),
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
    });
};

export const usePricingValidationSchema = () => {
    const t = useTranslations("Products.Pricing.validation");

    return Yup.object({
        name: Yup.string()
            .required(t("required"))
            .min(2, t("min", { min: 2 }))
            .max(20, t("max", { max: 20 })),
        pricingType: Yup.number().required(t("required")),
        percentage: Yup.number().when("pricingType", (pricing, schema) => {
            const type = Array.isArray(pricing) ? pricing[0] : pricing;
            if (Number(type) === pricingType.percentage) {
                return schema
                    .positive(t("positiveNumber"))
                    .typeError(t("invalidNumberFormat"))
                    .test(
                        "max-decimals",
                        t("decimalPlaces"),
                        (value) => value == null || /^\d+(\.\d{1,2})?$/.test(value as any)
                    )
                    .required(t("required"));
            }
            return schema.notRequired().nullable();
        }),
    });
};
