export const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
})
