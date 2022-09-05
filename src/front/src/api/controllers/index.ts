import {createContext, useContext} from "react";
import {TestApi} from "./TestApi";

export const Api = {
    TestApi: new TestApi()
} as const;

export type IApi = typeof Api;

export const ApiContext = createContext<IApi>(Api);

export const useApi = () => useContext(ApiContext);
