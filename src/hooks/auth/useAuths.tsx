"use client";
import { useAuth } from "@/providers/AuthProvider";
import { useAuthValidationSchema, useForgotValidationSchema, useResetPasswordValidationSchema } from "@/schemas";
import { authForgotPassword, authLogin, authResetPassword } from "@/services/authServices";
import { AuthMode } from "@/types/appTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

const SISTRA_RUC = "133556545";

const useAuths = (mode: AuthMode) => {
  const t = useTranslations("Login");
  const g = useTranslations("General");
  const router = useSafeRouter();
  const searchParams = useSearchParams();
  const { login, logout } = useAuth();
  const [isBtnDisable, setBtnDisable] = useState(false);

  const authSchema = useAuthValidationSchema(mode);
  const forgotSchema = useForgotValidationSchema();
  const resetSchema = useResetPasswordValidationSchema();

  const schema = mode === "forgot" ? forgotSchema : mode === "reset" ? resetSchema : authSchema;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, touchedFields },
    trigger,
    watch,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema as any),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (mode === "login") {
      const email = localStorage.getItem("rememberedEmail");
      const password = localStorage.getItem("rememberedPassword");
      if (email && password) {
        setValue("email", email);
        setValue("password", password);
        setValue("rememberMe", true);
      }
    }
  }, [mode, setValue]);

  const loginMutation = useMutation(authLogin, {
    onSuccess: (response) => {
      const token = response.data?.token;
      const isAuthenticated = response.data?.isAuthenticated;

      if (token && isAuthenticated) {
        const decoded = jwtDecode<any>(token);

        const ruc = (decoded.rucNumber || "").trim();
        if (ruc !== SISTRA_RUC) {
          toast.error("Acceso denegado: Este panel está restringido exclusivamente a SISTRA SRL.");
          return;
        }

        const permissionsClaim = decoded.Permission;
        const permissions = Array.isArray(permissionsClaim)
          ? permissionsClaim
          : permissionsClaim
            ? [permissionsClaim]
            : [];

        login(token, {
          email: decoded.email,
          userName: decoded.userName,
          companyName: decoded.companyName,
          rucNumber: decoded.rucNumber,
          province: decoded.province,
          municipality: decoded.municipality,
          address: decoded.address,
          isElectronicTransmitter: decoded.isElectronicTransmitter === "true" || decoded.isElectronicTransmitter === true,
          isRequiredWizard: false,
          permissions: permissions,
          companyLogoUrl: decoded.companyLogoUrl,
        });

        toast.success("¡Bienvenido al Panel SuperAdmin de SISTRA SRL!");
        router.push("/dashboard");
      }
    },
  });

  const forgotMutation = useMutation(authForgotPassword, {
    onSuccess: () => {
      toast.success("Password reset link sent to your email!");
      router.push("/");
    },
    onError: () => {
      toast.error(g("errorOccurs"));
    },
  });

  const resetMutation = useMutation(authResetPassword, {
    onSuccess: () => {
      toast.success("Password successfully reset!");
      router.push("/");
    },
    onError: () => {
      toast.error("Failed to reset password. The link might be expired.");
    },
  });

  const onSubmitLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    if (loginMutation.isLoading) return;

    try {
      if (isBtnDisable) return;
      setBtnDisable(true);
      await loginMutation.mutateAsync({ email: data.email, password: data.password });

      if (data.rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } catch (error: any) {
    } finally {
      setBtnDisable(false);
    }
  };

  const onSubmitLogout = async () => {
    logout();
    router.push("/");
  };

  const onSubmitForgot = async (data: { email: string }) => {
    try {
      if (isBtnDisable) return;
      setBtnDisable(true);
      await forgotMutation.mutateAsync({ email: data.email });
    } catch (error: any) {
    } finally {
      setBtnDisable(false);
    }
  };

  const onSubmitReset = async (data: { password: string }) => {
    const email = searchParams?.get("email");
    const token = searchParams?.get("token");

    if (!email || !token) {
      toast.error("Invalid password reset link.");
      return;
    }

    try {
      if (isBtnDisable) return;
      setBtnDisable(true);
      await resetMutation.mutateAsync({ email, token, newPassword: data.password });
    } catch (error: any) {
    } finally {
      setBtnDisable(false);
    }
  };

  const handlePreventDefault = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return {
    t,
    g,
    router,
    isBtnDisable,
    errors,
    control,
    touchedFields,
    setBtnDisable,
    handleSubmit,
    register,
    trigger,
    watch,
    setValue,
    reset,
    handlePreventDefault,
    onSubmitLogin,
    onSubmitLogout,
    onSubmitForgot,
    onSubmitReset,
  };
};

export default useAuths;
