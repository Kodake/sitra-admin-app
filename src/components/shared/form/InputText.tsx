"use client"
import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface InputTextProps {
    name: string;
    control: any;
    label: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    inputProps?: any;
    InputProps?: any;
    error?: boolean;
    helperText?: string;
    rows?: number;
    multiline?: boolean;
    fullWidth?: boolean;
    step?: string;
    disabled?: boolean;
    onChangeOverride?: (e: any) => void;
    value?: any;
    rules?: any;
    id?: string;
    isUppercase?: boolean;
    sx?: any;
}

const InputText: React.FC<InputTextProps> = ({
    name,
    control,
    label,
    type = "text",
    placeholder,
    autoComplete = "off",
    inputProps,
    InputProps,
    error,
    helperText,
    rows,
    multiline,
    fullWidth = true,
    step,
    disabled,
    onChangeOverride,
    rules,
    id,
    isUppercase = true,
    value: propValue,
    ...rest
}) => {
    const renderTextField = (fieldProps: any = {}) => (
        <TextField
            {...fieldProps}
            {...rest}
            label={label}
            id={id || name}
            type={type}
            placeholder={placeholder || label}
            autoComplete={autoComplete}
            value={propValue !== undefined ? propValue : (fieldProps.value ?? "")}
            onChange={(e) => {
                if (isUppercase && typeof e.target.value === "string" && (type === "text" || type === "password" || !type)) {
                    e.target.value = e.target.value.toUpperCase();
                }
                if (fieldProps.onChange) fieldProps.onChange(e);
                if (onChangeOverride) onChangeOverride(e);
            }}
            error={!!error}
            helperText={helperText}
            fullWidth={fullWidth}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
            InputProps={InputProps}
            inputProps={{
                ...inputProps,
                id: id || name,
                step: step,
            }}
            sx={{
                "& .MuiInputBase-input": {
                    textTransform: isUppercase ? "uppercase" : "none",
                },
                ...rest.sx,
            }}
        />
    );

    if (!control) {
        return renderTextField();
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ref, ...field } }) => (
                renderTextField({ ...field, onChange, value, inputRef: ref })
            )}
        />
    );
};

export default InputText;