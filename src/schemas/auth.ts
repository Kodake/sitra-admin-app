import { AuthMode } from "@/types/appTypes";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useAuthValidationSchema = (mode: AuthMode) => {
    const t = useTranslations("Login.validation");

    const isRegister = mode === "register";

    return Yup.object({
        companyName: Yup.string()
            .nullable()
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters"))
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),

        rucNumber: Yup.string()
            .nullable()
            .matches(/^[0-9]*$/, t("invalidCharacters"))
            .test(
                "length-9-or-11",
                t("rucLengthInvalid", { min: 9, max: 11 }),
                (value) => {
                    if (!value) return true;
                    return value.length === 9 || value.length === 11;
                }
            )
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),
        province: Yup.string()
            .transform((value) => (value === "" ? null : value))
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),

        municipality: Yup.string()
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),

        address: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .matches(/^[a-zA-Z0-9\s]*$/, t("invalidCharacters"))
            .test(
                "is-valid-length",
                t("min", { min: 2 }),
                (value) => !value || value.length >= 2
            )
            .max(100, t("max", { max: 100 }))
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),

        phoneNumber: Yup.string()
            .nullable()
            .transform((value) => (value === "" ? null : value))
            .matches(/^[0-9]*$/, t("invalidCharacters"))
            .length(10, t("phoneLengthInvalid", { length: 10 }))
            .when([], {
                is: () => isRegister,
                then: (schema) => schema.required(t("required")),
                otherwise: (schema) => schema.notRequired(),
            }),

        email: Yup.string()
            .required(t("required"))
            .email(t("invalidEmail"))
            .test(
                "is-valid-length",
                t("min", { min: 5 }),
                (value) => !value || value.length >= 5
            )
            .max(50, t("max", { max: 50 })),

        password: Yup.string()
            .required(t("required"))
            .matches(/[^a-zA-Z0-9]/, t("passwordRequiresNonAlphanumeric"))
            .matches(/\d/, t("passwordRequiresDigit"))
            .matches(/[a-z]/, t("passwordRequiresLower"))
            .matches(/[A-Z]/, t("passwordRequiresUpper"))
            .test(
                "is-valid-length",
                t("passwordTooShort", { min: 6 }),
                (value) => !value || value.length >= 6
            ),
        rememberMe: Yup.boolean().optional(),
    });
};

export const useUserValidationSchema = (mode: AuthMode) => {
    const t = useTranslations("Tools.User.validation");

    const isRegister = mode === "register";

    return Yup.object({
        roleId: Yup.string()
            .required(t("required")),

        email: Yup.string()
            .required(t("required"))
            .email(t("invalidEmail"))
            .test(
                "is-valid-length",
                t("min", { min: 5 }),
                (value) => !value || value.length >= 5
            )
            .max(50, t("max", { max: 50 })),

        password: Yup.string()
            .required(t("required"))
            .matches(/[^a-zA-Z0-9]/, t("passwordRequiresNonAlphanumeric"))
            .matches(/\d/, t("passwordRequiresDigit"))
            .matches(/[a-z]/, t("passwordRequiresLower"))
            .matches(/[A-Z]/, t("passwordRequiresUpper"))
            .test(
                "is-valid-length",
                t("passwordTooShort", { min: 6 }),
                (value) => !value || value.length >= 6
            ),

        passwordConfirmation: Yup.string()
            .required(t("required"))
            .oneOf([Yup.ref("password")], t("passwordsDoNotMatch")),
    });
};

export const useEditUserValidationSchema = (mode: AuthMode) => {
    const t = useTranslations("Tools.User.validation");

    return Yup.object({
        roleId: Yup.string()
            .required(t("required")),
    });
};

export const useForgotValidationSchema = () => {
    const t = useTranslations("Login.validation");
    return Yup.object({
        email: Yup.string()
            .required(t("required"))
            .email(t("invalidEmail")),
    });
};

export const useResetPasswordValidationSchema = () => {
    const t = useTranslations("Login.validation");
    return Yup.object({
        password: Yup.string()
            .required(t("required"))
            .matches(/[^a-zA-Z0-9]/, t("passwordRequiresNonAlphanumeric"))
            .matches(/\d/, t("passwordRequiresDigit"))
            .matches(/[a-z]/, t("passwordRequiresLower"))
            .matches(/[A-Z]/, t("passwordRequiresUpper"))
            .test(
                "is-valid-length",
                t("passwordTooShort", { min: 6 }),
                (value) => !value || value.length >= 6
            ),
        confirmPassword: Yup.string()
            .required(t("required"))
            .oneOf([Yup.ref("password")], t("passwordsDoNotMatch")),
    });
};
