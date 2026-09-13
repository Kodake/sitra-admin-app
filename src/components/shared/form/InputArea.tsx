import React from "react";
import InputText from "./InputText";

interface InputAreaProps {
    name: string;
    control: any;
    label: string;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    rows?: number;
    inputProps?: any;
    isUppercase?: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ rows = 4, ...props }) => {
    return <InputText {...props} multiline rows={rows} />;
};

export default InputArea;
