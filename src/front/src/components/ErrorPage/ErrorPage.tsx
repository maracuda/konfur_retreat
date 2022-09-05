import React from "react";
import {Link as RouterLink} from "react-router-dom";

import {Spacer} from "../controls/Spacer/Spacer";
import {AppRoutes} from "../../AppRoutes";

import {ErrorPageNotFound} from "./ErrorPageNotFound";
import {ErrorPageUnavailable} from "./ErrorPageUnavailable";
import styles from "./ErrorPage.module.scss";

interface IErrorPageProps {
    errorCode?: number;
}

export const ErrorPage = (props: IErrorPageProps) => {
    const {errorCode} = props;

    const content = React.useMemo(() => {
        switch (errorCode) {
            case 404:
                return <ErrorPageNotFound/>;
            default:
                return <ErrorPageUnavailable/>;
        }
    },[errorCode]);

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <RouterLink className={styles.logotype} to={AppRoutes.Root}>
                </RouterLink>
            </header>
            <Spacer gap={96}/>
            <div className={styles.content}>
                {content}
            </div>
            <Spacer gap={50}/>
        </div>
    );
};

ErrorPage.displayName = "ErrorPage";