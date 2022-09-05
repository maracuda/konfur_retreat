import React from "react";

import {Spacer} from "../controls/Spacer/Spacer";

import styles from "./ErrorPage.module.scss";

export const ErrorPageNotFound = () => (
    <div>
        <h1>
            Страница не найдена <sup className={styles.code}>{404}</sup>
        </h1>
        <Spacer gap={32}/>
        В адресе есть ошибка или страница удалена.
        <Spacer gap={24}/>
        Если ошибка повторяется — обратитесь в техподдержку 8 800 500-50-80.
    </div>
);

ErrorPageNotFound.displayName = "ErrorPageNotFound";