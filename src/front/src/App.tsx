import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Loader} from "@skbkontur/react-ui";

import {AppErrorProvider} from "./components/AppErrorProvider/AppErrorProvider";
import {AppRoutes} from "./AppRoutes";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";
import {ApiBasePrefix} from "../contracts/apiBase/ApiBasePrefix";
import {ApiBase} from "../contracts/apiBase/ApiBase";
import MainPage from "./components/MainPage/MainPage";

export const App = () => (
    <BrowserRouter>
        <AppErrorProvider>
            <Suspense fallback={<Loader active type="big"/>}>
                <Routes>
                    <Route path={AppRoutes.Root} element={<MainPage/>}/>
                    <Route path="*" element={<ErrorPage errorCode={404}/>} key={"error"}/>
                </Routes>
            </Suspense>
        </AppErrorProvider>
    </BrowserRouter>
);

ApiBase.initialize(ApiBasePrefix);