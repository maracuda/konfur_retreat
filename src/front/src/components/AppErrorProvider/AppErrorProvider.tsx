import type {PropsWithChildren, ReactNode} from "react";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";

import {ErrorPage} from "../ErrorPage/ErrorPage";


export const AppErrorProvider = ({children}: PropsWithChildren<ReactNode>) => {
    const [appError, setError] = React.useState<number>();

    return (
        <ErrorBoundary
            onError={(error) => {setError(error as unknown as number)}}
            FallbackComponent={() => <ErrorPage errorCode={appError} />}
        >
            {children}
        </ErrorBoundary>
    );
};

AppErrorProvider.displayName = "AppErrorProvider";