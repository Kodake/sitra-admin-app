export const sanitize = (value: string | undefined | null): string | null => {
    if (value === undefined || value === null || value.trim() === "") {
        return null;
    }
    return value.trim().toUpperCase();
};
