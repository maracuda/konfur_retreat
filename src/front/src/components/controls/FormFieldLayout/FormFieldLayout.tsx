import type {ReactNode} from "react";
import React from "react";

import styles from "./FormFieldLayout.module.scss";

export interface FormFieldLayoutProps {
    label: ReactNode;
}

export const FormFieldLayout: React.FC<FormFieldLayoutProps> = (props) => {
    const {label, children} = props;

    return (
        <div className={styles.row}>
            <div className={styles.label}>{label}</div>
            <div className={styles.control}>{children}</div>
        </div>
    );
};
