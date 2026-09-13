"use client"
import {
    Autocomplete,
    Chip,
    MenuItem,
    Popover,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

interface InputAutocompleteTextProps {
    name: string;
    control: any;
    label: string;
    options: any[];
    error?: boolean;
    helperText?: string;
    disabled?: boolean;
    rules?: any;
    isUppercase?: boolean;
}

const InputAutocompleteText: React.FC<InputAutocompleteTextProps> = ({
    name,
    control,
    label,
    options,
    error,
    helperText,
    disabled,
    rules,
    isUppercase = true,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [currentItemId, setCurrentItemId] = useState<number | null>(null);

    // Close helper
    const handleClose = () => {
        setAnchorEl(null);
        setCurrentItemId(null);
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={[]}
            render={({ field: { onChange, value = [], ref, onBlur } }) => (
                <>
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        id={name}
                        options={options}
                        getOptionLabel={(option) => option.name}
                        disabled={disabled}
                        // Map the field value (array of { id, qty }) to the Option objects
                        value={options.filter((p) =>
                            value?.some((fv: any) => fv.id === p.id)
                        )}
                        onChange={(_, newValue) => {
                            // Map the selected Options back to { id, qty }
                            // Prepare the new array based on selection
                            const updated = newValue.map((p: any) => {
                                // Check if we already have this item to preserve its qty
                                const existing = value?.find((fv: any) => fv.id === p.id);
                                return existing || { id: p.id, qty: 1 };
                            });
                            onChange(updated);
                        }}
                        onBlur={onBlur}
                        renderOption={(props, option) => {
                            const { key, ...otherProps } = props;
                            return (
                                <MenuItem key={key} {...otherProps}>
                                    {option.name}
                                </MenuItem>
                            );
                        }}
                        renderTags={(selected, getTagProps) =>
                            selected.map((option, index) => {
                                // Find the quantity for the label
                                const item = value?.find((fv: any) => fv.id === option.id);
                                return (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={option.id}
                                        label={`${option.name} (${item?.qty ?? 0})`}
                                        onClick={(e) => {
                                            setAnchorEl(e.currentTarget);
                                            setCurrentItemId(option.id);
                                        }}
                                    />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={helperText}
                                fullWidth
                                inputRef={ref}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        textTransform: isUppercase ? "uppercase" : "none",
                                    },
                                }}
                            />
                        )}
                    />

                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        {currentItemId !== null && (
                            <div style={{ padding: "12px 16px" }}>
                                <TextField
                                    type="number"
                                    label="Cantidad"
                                    size="small"
                                    value={
                                        value?.find((fv: any) => fv.id === currentItemId)?.qty ?? 1
                                    }
                                    onChange={(e) => {
                                        const newQty = Math.max(
                                            1,
                                            parseInt(e.target.value, 10) || 1
                                        );
                                        // Update only the specific item's quantity
                                        const updated = value.map((fv: any) =>
                                            fv.id === currentItemId ? { ...fv, qty: newQty } : fv
                                        );
                                        onChange(updated);
                                    }}
                                />
                            </div>
                        )}
                    </Popover>
                </>
            )}
        />
    );
};

export default InputAutocompleteText;
