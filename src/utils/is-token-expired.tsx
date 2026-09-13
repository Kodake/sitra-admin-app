import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp?: number;
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (!decoded.exp) return true;

    const now = Date.now();
    const expTime = decoded.exp * 1000;

    return expTime < now;
  } catch {
    return true;
  }
};
