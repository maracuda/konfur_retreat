import React, {cloneElement} from "react";

import {FormFieldLayout} from "../FormFieldLayout/FormFieldLayout";

interface IFormFieldProps {
    label: React.ReactNode;
    children: React.ReactElement;
}

export const FormField = (props: IFormFieldProps) => {
    const {children, label} = props;

    return (
        <FormFieldLayout label={<label>{label}</label>}>
            {cloneElement(children, {
                width: "100%",
                style: {fontSize: "16px"},
                ...children.props
            })}
        </FormFieldLayout>
    );
};

FormField.displayName = "FormField";
