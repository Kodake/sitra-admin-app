export const sanitizeNumber = (value: string | number | undefined | null): number | null => {
    if (value === undefined || value === null || value === "") {
        return null;
    }

    const sanitizedValue = typeof value === "string" ? value.trim() : value;

    const numberValue = Number(sanitizedValue);
    return isNaN(numberValue) ? null : numberValue;
};
