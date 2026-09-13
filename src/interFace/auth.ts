import { language } from "@/enums/appEnums";

// Auth Services Interfaces

export interface IAuthRegisterParams {
    companyName: string;
    rucNumber: string;
    province: string;
    municipality: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
}

export interface IAuthLoginParams {
    email: string;
    password: string;
}

export interface IChangeLanguageParams {
    language: language;
}

export interface IUpdateProfileNameParams {
    userName: string;
    province?: string | null;
    municipality?: string | null;
    address: string;
    phoneNumber: string;
    certificate?: File;
    certificatePassword?: string;
    companyLogo?: File | null;
}
