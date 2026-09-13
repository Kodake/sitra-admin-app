import { planType } from "@/enums/appEnums";
import { IAuthLoginParams, IAuthRegisterParams, IChangeLanguageParams, IUpdateProfileNameParams } from "@/interFace";
import axios from "@/services/auth/authAxiosInstanceServices";
import { sanitize } from "@/utils/sanitize-string";

export const authRegister = (data: IAuthRegisterParams) => {
  const sanitizedValues = {
    companyName: sanitize(data.companyName),
    rucNumber: sanitize(data.rucNumber),
    province: sanitize(data.province),
    municipality: sanitize(data.municipality),
    address: sanitize(data.address),
    phoneNumber: sanitize(data.phoneNumber),
    email: sanitize(data.email),
    password: data.password,
    plan: planType.free,
  };
  return axios.post("/identity/register", sanitizedValues, {
    headers: {
      "X-Idempotency-Key": crypto.randomUUID(),
    },
  });
};

export const authLogin = (data: IAuthLoginParams) => {
  const sanitizedValues = {
    email: sanitize(data.email),
    password: data.password,
  };

  return axios.post("/identity/login", sanitizedValues);
};

export const authForgotPassword = (data: { email: string }) => {
  return axios.post("/identity/forgot-password", data);
};

export const authResetPassword = (data: { email: string; token: string; newPassword: string }) => {
  return axios.post("/identity/reset-password", data);
};

export const fetchCurrentUser = () => axios.get(`/identity/me`);

export const updateProfileName = (data: IUpdateProfileNameParams) => {
  const formData = new FormData();
  formData.append("userName", data.userName);
  if (data.province) formData.append("province", data.province);
  if (data.municipality) formData.append("municipality", data.municipality);
  if (data.address) formData.append("address", data.address);
  if (data.phoneNumber) formData.append("phoneNumber", data.phoneNumber);
  if (data.certificate) formData.append("certificate", data.certificate);
  if (data.certificatePassword) formData.append("certificatePassword", data.certificatePassword);
  if (data.companyLogo) formData.append("companyLogo", data.companyLogo);

  return axios.patch("/identity/update-profile", formData);
};

export const validateOpenedPettyCash = () => axios.get("/identity/validate-opened-petty-cash");

export const validateUploadedCertificateRnc = () => axios.get(`/identity/validate-uploaded-certificate`);

export const changeLanguage = ({ language }: IChangeLanguageParams) => axios.patch("/identity/change-language", {
  language,
});