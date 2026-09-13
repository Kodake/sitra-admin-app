"use client";
import { IUpdateProfileNameParams } from "@/interFace";
import { useProfileSchema } from "@/schemas";
import {
    fetchCurrentUser,
    updateProfileName as updateProfileNameService,
} from "@/services/authServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useSafeRouter } from "@/hooks/useSafeRouter";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const useProfile = () => {
    const t = useTranslations("Login");
    const g = useTranslations("General");
    const queryClient = useQueryClient();
    const schema = useProfileSchema();
    const router = useSafeRouter();

    const { data: currentUser, isLoading } = useQuery(
        ["currentUser"],
        async () => {
            const response = await fetchCurrentUser();
            return response.data;
        },
        {
            refetchOnWindowFocus: true,
        }
    );

    const { mutateAsync: updateProfileName } = useMutation(
        (data: IUpdateProfileNameParams) => updateProfileNameService(data),
        {
            onSuccess: () => {
                toast.success(g("updatedSuccess"));
                queryClient.invalidateQueries(["currentUser"]);
            },
        }
    );

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            userName: "",
            province: "",
            municipality: "",
            address: "",
            phoneNumber: "",
            certificate: null,
            certificatePassword: "",
            companyLogo: null,
        },
    });

    useEffect(() => {
        if (currentUser) {
            reset({
                userName: currentUser.userName || "",
                province: currentUser.province || "",
                municipality: currentUser.municipality || "",
                address: currentUser.address || "",
                phoneNumber: currentUser.phoneNumber || "",
                companyLogo: null,
            });
        }
    }, [currentUser, reset]);

    const onSubmit = async (data: IUpdateProfileNameParams) => {
        try {
            await updateProfileName(data);
            router.push('/dashboard');
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    };

    const handlePreventDefault = (
        e: React.ClipboardEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
    };

    return {
        t,
        g,
        currentUser,
        handleSubmit,
        control,
        setValue,
        errors,
        onSubmit,
        handlePreventDefault,
        isLoading
    };
};

export default useProfile;