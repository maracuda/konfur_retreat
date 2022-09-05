import React from "react";

import {Spacer} from "../controls/Spacer/Spacer";

import styles from "./ErrorPage.module.scss";

export const ErrorPageUnavailable = () => (
    <div>
        <h1>
            Сервис недоступен <sup className={styles.code}>{500}</sup>
        </h1>
        <Spacer gap={32}/>
        Мы знаем о проблеме и работаем над её решением. Извините за неудобства.
        <Spacer gap={24}/>
        Попробуйте обновить страницу позже.
        <br/>
        Если ошибка повторяется — обратитесь в техподдержку 8 800 500-50-80.
    </div>
);

ErrorPageUnavailable.displayName = "ErrorPageUnavailable";