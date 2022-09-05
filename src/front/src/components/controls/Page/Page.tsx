import React from "react";

import styles from "./Page.module.scss";

type PageProps = React.PropsWithChildren<React.ReactNode> & {
    header: React.ReactNode
};

export const Page = (props: PageProps) => {
    const {children, header} = props;

    return (
        <div className={styles.root}>
            <h1>{header}</h1>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

Page.displayName = "Page";