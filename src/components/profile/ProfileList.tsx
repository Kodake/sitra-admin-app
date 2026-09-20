"use client";
import InputText from "@/components/shared/form/InputText";
import { getMunicipalitiesByProvince, province_data } from "@/enums/appEnums";
import useProfile from "@/hooks/auth/useProfile";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useWatch } from "react-hook-form";
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
    setValue,
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
    <div className="inventual-content-area px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-20 sm:mb-10">
      {/* Top Profile Header Card - POS Style */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: Avatar / Logo + User Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200/80 dark:border-slate-700/80 shadow-md flex items-center justify-center p-2.5 flex-shrink-0 group transition-all">
              <img
                src={logoPreview}
                alt="Company Logo"
                className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  {currentUser?.userName ?? "—"}
                </h2>
                <span className="badge-stroke badge-primary">
                  <i className="fa-solid fa-shield-halved text-[10px]"></i>
                  <span>{t("adminRole") || "Administrador"}</span>
                </span>
                <span className="badge-stroke badge-success">
                  <span>{t("active") || "Activo"}</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                {currentUser?.email && (
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fa-regular fa-envelope text-slate-400"></i>
                    <span>{currentUser.email}</span>
                  </span>
                )}
                {currentUser?.companyName && (
                  <span className="inline-flex items-center gap-1.5">
                    <i className="fa-regular fa-building text-slate-400"></i>
                    <span>{currentUser.companyName}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: RNC / Identity Pill */}
          {currentUser?.rucNumber && (
            <div className="flex flex-col sm:items-end justify-center self-start sm:self-auto gap-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                RNC / Cédula
              </span>
              <div className="font-mono text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100 px-3.5 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-inner">
                {currentUser.rucNumber}
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: General & Location Information */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Header with Icon */}
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                {t("personalInfo") || "Información Personal y Ubicación"}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {t("personalInfoSubtitle") || "Actualiza los datos de contacto y localización de la empresa"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-6">
              <InputText
                name="userName"
                id="profile-user-name"
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
            <div className="col-span-12 md:col-span-6">
              <InputText
                name="phoneNumber"
                id="profile-phone-number"
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

            {/* Read-only Account Properties */}
            <div className="col-span-12 md:col-span-4">
              <InputText
                label={t("email")}
                value={currentUser?.email ?? ""}
                name="email"
                id="profile-email"
                control={control}
                inputProps={{
                  onCopy: handlePreventDefault,
                  onCut: handlePreventDefault,
                  onPaste: handlePreventDefault,
                }}
                disabled
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputText
                label={t("rucNumber")}
                value={currentUser?.rucNumber ?? ""}
                name="rucNumber"
                id="profile-ruc"
                control={control}
                inputProps={{
                  onCopy: handlePreventDefault,
                  onCut: handlePreventDefault,
                  onPaste: handlePreventDefault,
                }}
                disabled
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <InputText
                label={t("companyName")}
                value={currentUser?.companyName ?? ""}
                name="companyName"
                id="profile-company-name"
                control={control}
                inputProps={{
                  onCopy: handlePreventDefault,
                  onCut: handlePreventDefault,
                  onPaste: handlePreventDefault,
                }}
                disabled
              />
            </div>

            {/* Address & Geographical Pickers */}
            <div className="col-span-12">
              <InputText
                name="address"
                id="profile-address"
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
            <div className="col-span-12 md:col-span-6">
              <InputAutocomplete
                name="province"
                id="profile-province"
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
            <div className="col-span-12 md:col-span-6">
              <InputAutocomplete
                name="municipality"
                id="profile-municipality"
                control={control}
                label={t("municipality")}
                options={
                  selectedProvince
                    ? getMunicipalitiesByProvince(selectedProvince)
                    : []
                }
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
          </div>
        </div>

        {/* Section 2: Electronic Signature (e-CF) & Corporate Logo */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          {/* Header with Icon */}
          <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                {t("ecfAndSecurity") || "Firma Electrónica e Identidad"}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {t("ecfAndSecuritySubtitle") || "Certificado digital para e-CF y logotipo corporativo"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Company Logo Upload */}
            <div className="col-span-12 md:col-span-6 flex flex-col">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                {t("companyLogoLabel") || "Logo de la Empresa (Máx 500 KB)"}
              </label>
              <div className="relative overflow-hidden flex-1">
                <FileUploader
                  id="logo-file"
                  label="logo"
                  maxSize={0.5} // 500KB = 0.5MB
                  classes="inventual-input-upload-btn w-full h-full"
                  onDrop={(file: File) =>
                    setValue("companyLogo", file, { shouldValidate: true })
                  }
                  handleChange={(file: File) =>
                    setValue("companyLogo", file, { shouldValidate: true })
                  }
                  types={["JPG", "JPEG", "PNG"]}
                >
                  <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 rounded-2xl text-center transition-all cursor-pointer flex flex-col justify-center items-center min-h-[185px] group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {selectedCompanyLogo
                        ? (selectedCompanyLogo as File).name
                        : t("dragCompanyLogo") || "Arrastra el logo de tu empresa aquí"}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      {t("maxLogoSizeHint") || "Formatos permitidos: JPG, PNG. Tamaño máx: 500 KB."}
                    </p>
                    <button
                      type="button"
                      className="mt-3 px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-sm"
                    >
                      {t("browseFile") || "Explorar Archivo"}
                    </button>
                  </div>
                </FileUploader>
                {errors.companyLogo && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {(errors as any).companyLogo?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Certificate Upload */}
            <div className="col-span-12 md:col-span-6 flex flex-col">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                {t("signatureCertificate") || "Certificado de Firma (e-CF)"}
              </label>
              <div className="relative overflow-hidden flex-1">
                <FileUploader
                  id="file"
                  label="file"
                  maxSize={5}
                  classes="inventual-input-upload-btn w-full h-full"
                  onDrop={(file: File) =>
                    setValue("certificate", file, { shouldValidate: true })
                  }
                  handleChange={(file: File) =>
                    setValue("certificate", file, { shouldValidate: true })
                  }
                  types={["P12"]}
                >
                  <div className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-800/60 rounded-2xl text-center transition-all cursor-pointer flex flex-col justify-center items-center min-h-[185px] group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {selectedCertificate
                        ? (selectedCertificate as File).name
                        : t("dropYourCertificateHere") || "Arrastra tu certificado aquí"}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      {t("maxCertSizeHint") || "Formato requerido: .P12. Tamaño máx: 5 MB."}
                    </p>
                    <button
                      type="button"
                      className="mt-3 px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs shadow-sm"
                    >
                      {t("browseFile") || "Explorar Archivo"}
                    </button>
                  </div>
                </FileUploader>
                {errors.certificate && (
                  <p className="mt-1 text-xs text-rose-500 font-medium">
                    {(errors as any).certificate?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Certificate Password */}
            <div className="col-span-12 md:col-span-6 md:col-start-7">
              <InputText
                name="certificatePassword"
                id="profile-certificate-password"
                control={control}
                label={t("certificatePassword")}
                type="password"
                isUppercase={false}
                placeholder={t("certificatePassword")}
                error={Boolean((errors as any).certificatePassword)}
                helperText={(errors as any).certificatePassword?.message as string}
              />
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-9 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span>{g("saveChanges") || g("edit") || "Guardar Cambios"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileList;
