"use client"
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface InputAutocompleteProps {
    name: string;
    control: any;
    label: string;
    options: any[];
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    onChangeOverride?: (newValue: any) => void;
    multiple?: boolean;
    getOptionLabel?: (option: any) => string;
    isOptionEqualToValue?: (option: any, value: any) => boolean;
    valueKey?: string;
    rules?: any;
    id?: string;
    isUppercase?: boolean;
}

const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
    name,
    control,
    label,
    options,
    error,
    helperText,
    disabled,
    onChangeOverride,
    multiple,
    getOptionLabel,
    isOptionEqualToValue,
    valueKey = "id",
    rules,
    id,
    isUppercase = true,
    ...rest
}) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value, ref, onBlur, ...field } }) => {
                const safeOptions = options || [];
                const resolvedValue = multiple
                    ? safeOptions.filter((opt) => (value || []).map(String).includes(String(opt[valueKey])))
                    : safeOptions.find((opt) => String(opt[valueKey]) === String(value)) || null;

                return (
                    <Autocomplete
                        multiple={multiple}
                        {...field}
                        {...rest}
                        id={id || name}
                        options={safeOptions}
                        getOptionLabel={getOptionLabel || ((option) => `${option.name}`)}
                        isOptionEqualToValue={
                            isOptionEqualToValue
                                ? (option, val) => {
                                      if (val === null || val === undefined || val === "") return false;
                                      return isOptionEqualToValue(option, val);
                                  }
                                : undefined
                        }
                        value={resolvedValue}
                        onChange={(_, newValue) => {
                            let resolvedOnChangeValue;
                            if (multiple) {
                                resolvedOnChangeValue = (newValue as any[]).map(v => v[valueKey]);
                            } else {
                                resolvedOnChangeValue = newValue ? (newValue as any)[valueKey] : "";
                            }

                            onChange(resolvedOnChangeValue);
                            if (onChangeOverride) onChangeOverride(newValue);
                        }}
                        onBlur={onBlur}
                        disabled={disabled}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={helperText}
                                fullWidth
                                inputRef={ref}
                                inputProps={{
                                    ...params.inputProps,
                                    id: id || name
                                }}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        textTransform: isUppercase ? "uppercase" : "none",
                                    },
                                }}
                            />
                        )}
                        slotProps={{
                            paper: {
                                sx: {
                                    minWidth: 240,
                                    width: "max-content",
                                    maxWidth: 480,
                                }
                            }
                        }}
                        renderOption={(props, option) => {
                            const { key, ...otherProps } = props;

                            return (
                                <MenuItem
                                    key={key}
                                    {...otherProps}
                                    sx={{ whiteSpace: "normal", wordBreak: "break-word" }}
                                >
                                    {getOptionLabel ? getOptionLabel(option) : (option.name || option.label || option[valueKey])}
                                </MenuItem>
                            );
                        }}

                    />
                );
            }}
        />
    );
};

export default InputAutocomplete;
