import React from "react";
import { FC, useContext } from "react";
import { IAllApis, RealAllApis } from "../contracts/api/AllApis";

export const WebApi = new RealAllApis();

const WebApiContext = React.createContext<IAllApis>(WebApi);

export const WebApiProvider: FC<IAllApis> = ({ children, ...props }) => (
    <WebApiContext.Provider value={props}>{children}</WebApiContext.Provider>
);

export interface IAllApisProp {
    webApi: IAllApis;
}

export function withWebApi<TProps extends IAllApisProp>(C: React.ComponentType<TProps>): React.VFC<Omit<TProps, keyof IAllApisProp>> {
  return function WebApiWrapper(props): React.ReactElement {
    const webApi = React.useContext(WebApiContext);
    // @ts-ignore
    return <C {...props} webApi={webApi} />;
  }
}

export const useWebApi = (): IAllApis => useContext(WebApiContext);
