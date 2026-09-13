"use client"
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

interface InputDateProps {
    name: string;
    control: any;
    label: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    rules?: any;
    id?: string;
}

const InputDate = ({
    name,
    control,
    label,
    error,
    helperText,
    required,
    disabled,
    rules,
    id
}: InputDateProps) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules || { required: required ? `${label} is required` : false }}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                        label={label}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue: Dayjs | null) => {
                            field.onChange(newValue ? newValue.toDate() : null);
                        }}
                        onClose={() => {
                            if (document.activeElement instanceof HTMLElement) {
                                document.activeElement.blur();
                            }

                            const dashboard = document.querySelector<HTMLElement>(
                                ".inventual-dashboard-area"
                            );

                            if (dashboard) {
                                dashboard.removeAttribute("aria-hidden");

                                if ("inert" in dashboard) {
                                    (dashboard as any).inert = false;
                                }
                            }

                            requestAnimationFrame(() => {
                                const firstFocusable = dashboard?.querySelector<HTMLElement>(
                                    "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
                                );
                                firstFocusable?.focus();
                            });
                        }}
                        minutesStep={5}
                        disablePast
                        ampm
                        format="DD-MM-YYYY hh:mm A"
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                id: id || name,
                                name: name,
                                fullWidth: true,
                                error: error,
                                helperText: helperText,
                                InputLabelProps: { shrink: true },
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default InputDate;
