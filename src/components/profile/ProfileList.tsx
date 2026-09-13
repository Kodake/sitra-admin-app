"use client";
import InputText from "@/components/shared/form/InputText";
import { getMunicipalitiesByProvince, province_data } from "@/enums/appEnums";
import useProfile from "@/hooks/auth/useProfile";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useWatch } from "react-hook-form";
import dropProductImg from "../../../public/assets/img/icon/drag.png";
import adminUser from "../../../public/assets/img/user/user-profile.png";
import InputAutocomplete from "../shared/form/InputAutocomplete";

const ProfileList = () => {
    const {
        currentUser,
        handleSubmit,
        control,
        errors,
        onSubmit,
        handlePreventDefault,
        setValue
    } = useProfile();
    const t = useTranslations("Login");
    const g = useTranslations("General");

    const selectedProvince = useWatch({
        name: "province",
        control,
    });

    const selectedCertificate = useWatch({
        name: "certificate",
        control,
    });

    const selectedCompanyLogo = useWatch({
        name: "companyLogo",
        control,
    });

    const logoPreview = useMemo(() => {
        if (selectedCompanyLogo && selectedCompanyLogo instanceof File) {
            return URL.createObjectURL(selectedCompanyLogo);
        }
        return currentUser?.companyLogoUrl || adminUser.src;
    }, [selectedCompanyLogo, currentUser?.companyLogoUrl]);

    return (
        <div className="inventual-content-area px-4 sm:px-7">
            <div className="inventual-add-category-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                <div className="inventual-profile-info flex flex-wrap items-center gap-5 mb-10">
                    <div className="inventual-profile-info-img relative group">
                        <div className="company-logo-bg w-[120px] h-[120px] rounded-full overflow-hidden bg-white border-2 border-purple-500/20 shadow-md flex items-center justify-center p-3 transition-all duration-300 hover:scale-105">
                            <img
                                src={logoPreview}
                                alt="Company Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                    <div className="inventual-profile-info-text">
                        <h4 className="text-heading font-bold text-[20px] md:text-[24px] mb-1">
                            {currentUser?.userName ?? "—"}
                        </h4>
                        <p className="text-body font-medium text-[14px]">
                            {t("adminRole")}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="group">
                    <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <InputText
                                name="userName"
                                control={control}
                                label={t("userName")}
                                placeholder={t("userName")}
                                error={Boolean(errors.userName)}
                                helperText={errors.userName?.message}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <InputText
                                name="phoneNumber"
                                control={control}
                                label={t("phoneNumber")}
                                placeholder={t("phoneNumber")}
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber?.message}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                            />
                        </div>
                        <div className="col-span-12">
                            <InputText
                                name="address"
                                control={control}
                                label={t("address")}
                                placeholder={t("address")}
                                error={Boolean(errors.address)}
                                helperText={errors.address?.message}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <InputAutocomplete
                                name="province"
                                control={control}
                                label={t("province")}
                                options={province_data}
                                valueKey="code"
                                getOptionLabel={(option) => `(${option.code}) ${option.name}`}
                                error={Boolean(errors.province)}
                                helperText={errors.province?.message}
                                onChangeOverride={(newValue: any) => {
                                    if (!newValue) setValue("municipality", "");
                                    return newValue ? newValue.code : "";
                                }}
                                isOptionEqualToValue={(option, value) => option.code === value.code}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <InputAutocomplete
                                name="municipality"
                                control={control}
                                label={t("municipality")}
                                options={selectedProvince ? getMunicipalitiesByProvince(selectedProvince) : []}
                                valueKey="code"
                                getOptionLabel={(option) => `(${option.code}) ${option.name}`}
                                error={Boolean(errors.municipality)}
                                helperText={errors.municipality?.message as string}
                                onChangeOverride={(newValue: any) => {
                                    return newValue ? newValue.code : "";
                                }}
                                isOptionEqualToValue={(option, value) => option.code === value.code}
                                disabled={!selectedProvince}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                            <InputText
                                label={t("email")}
                                value={currentUser?.email ?? ""}
                                name={"email"}
                                control={control}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                                disabled
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                            <InputText
                                label={t("rucNumber")}
                                value={currentUser?.rucNumber ?? ""}
                                name={"rucNumber"}
                                control={control}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                                disabled
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-4">
                            <InputText
                                label={t("companyName")}
                                value={currentUser?.companyName ?? ""}
                                name={"companyName"}
                                control={control}
                                inputProps={{
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                }}
                                disabled
                            />
                        </div>

                        {/* Company Logo Upload */}
                        <div className="col-span-12 md:col-span-6 flex flex-col">
                            <div className="mb-2 mt-1 flex-1 flex flex-col">
                                <label className="block text-sm font-semibold text-heading mb-2">{t("companyLogoLabel")}</label>
                                <div className="inventual-product-image-upload rounded-lg relative overflow-hidden flex-1">
                                    <FileUploader
                                        id="logo-file"
                                        label="logo"
                                        maxSize={0.5} // 500KB = 0.5MB
                                        classes="inventual-input-upload-btn h-full"
                                        onDrop={(file: File) => setValue("companyLogo", file, { shouldValidate: true })}
                                        handleChange={(file: File) => setValue("companyLogo", file, { shouldValidate: true })}
                                        types={["JPG", "JPEG", "PNG"]}
                                    >
                                        <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border-2 border-dashed border-purple-400/50 dark:border-slate-600 bg-purple-50/50 dark:bg-slate-800/50 rounded-xl py-6 px-4 transition-colors hover:bg-purple-50 dark:hover:bg-slate-800 cursor-pointer h-full min-h-[175px] flex flex-col justify-center items-center">
                                            <span className="flex justify-center items-center mb-3">
                                                <Image
                                                    id="logoUp"
                                                    src={dropProductImg}
                                                    alt="logo"
                                                    priority
                                                />
                                            </span>
                                            <h5 className="text-[15px] font-semibold text-heading mb-2">
                                                {t("dragCompanyLogo")}
                                            </h5>
                                            <button type="button" className="inventual-btn secondary-btn py-1.5 px-4 text-sm">
                                                {t("browseFile")}
                                            </button>
                                        </div>
                                    </FileUploader>
                                    {selectedCompanyLogo && (
                                        <div className="mt-2 text-sm text-gray-600 font-medium">
                                            {(selectedCompanyLogo as File).name}
                                        </div>
                                    )}
                                    {errors.companyLogo && (
                                        <p className="mt-1 text-sm text-red-500">{(errors as any).companyLogo?.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Certificate Upload */}
                        <div className="col-span-12 md:col-span-6 flex flex-col">
                            <div className="mb-2 mt-1 flex-1 flex flex-col">
                                <label className="block text-sm font-semibold text-heading mb-2">{t("signatureCertificate")}</label>
                                <div className="inventual-product-image-upload rounded-lg relative overflow-hidden flex-1">
                                    <FileUploader
                                        id="file"
                                        label="file"
                                        maxSize={5}
                                        classes="inventual-input-upload-btn h-full"
                                        onDrop={(file: File) => setValue("certificate", file, { shouldValidate: true })}
                                        handleChange={(file: File) => setValue("certificate", file, { shouldValidate: true })}
                                        types={["P12"]}
                                    >
                                        <div className="inventual-product-dragdrop ngx-file-drop__drop-zone text-center border-2 border-dashed border-blue-400/50 dark:border-slate-600 bg-blue-50/50 dark:bg-slate-800/50 rounded-xl py-6 px-4 transition-colors hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer h-full min-h-[175px] flex flex-col justify-center items-center">
                                            <span className="flex justify-center items-center mb-3">
                                                <Image
                                                    id="fileUp"
                                                    src={dropProductImg}
                                                    alt="file"
                                                    priority
                                                />
                                            </span>
                                            <h5 className="text-[15px] font-semibold text-heading mb-2">
                                                {t("dropYourCertificateHere")}
                                            </h5>
                                            <button type="button" className="inventual-btn py-1.5 px-4 text-sm">
                                                {t("browseFile")}
                                            </button>
                                        </div>
                                    </FileUploader>
                                    {selectedCertificate && (
                                        <div className="mt-2 text-sm text-gray-600 font-medium">
                                            {(selectedCertificate as File).name}
                                        </div>
                                    )}
                                    {errors.certificate && (
                                        <p className="mt-1 text-sm text-red-500">{(errors as any).certificate?.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Certificate Password */}
                        <div className="col-span-12 md:col-span-6 md:col-start-7">
                            <InputText
                                name="certificatePassword"
                                control={control}
                                label={t("certificatePassword")}
                                type="password"
                                isUppercase={false}
                                placeholder={t("certificatePassword")}
                                error={Boolean((errors as any).certificatePassword)}
                                helperText={(errors as any).certificatePassword?.message as string}
                            />
                        </div>


                        <div className="col-span-12 flex justify-end">
                            <button type="submit" className="disabled:opacity-50 disabled:cursor-not-allowed inventual-btn">
                                {g("edit")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileList;
