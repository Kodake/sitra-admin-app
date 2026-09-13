"use client"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";

interface InputDateSelectProps {
    name: string;
    control: any;
    label: string;
    error?: boolean;
    helperText?: string;
    required?: boolean;
    disabled?: boolean;
    rules?: any;
    id?: string;
    disableFuture?: boolean;
}

const InputDateSelect = ({
    name,
    control,
    label,
    error,
    helperText,
    required,
    disabled,
    rules,
    id,
    disableFuture = false,
}: InputDateSelectProps) => {
    const handlePreventDefault = (e: React.ClipboardEvent) => {
        e.preventDefault();
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules || { required: required ? `${label} is required` : false }}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        disableFuture={disableFuture}
                        label={label}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(newValue: Dayjs | null) => {
                            field.onChange(newValue ? newValue.toDate() : null);
                        }}
                        format="DD-MM-YYYY"
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                id: id || name,
                                name: name,
                                fullWidth: true,
                                error: error,
                                helperText: helperText,
                                InputLabelProps: { shrink: true },
                                autoComplete: "off",
                                inputProps: {
                                    onCopy: handlePreventDefault,
                                    onCut: handlePreventDefault,
                                    onPaste: handlePreventDefault,
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default InputDateSelect;
