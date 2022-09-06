// tslint:disable
// TypeScriptContractGenerator's generated content
import { RetreatStatistics } from './../RetreatStatistics';
import {Nullable} from "@skbkontur/react-ui/typings/utility-types";
import {ApiBase} from "../../src/apiBase/ApiBase";

export class RetreatStatisticsApi extends ApiBase implements IRetreatStatisticsApi {
    async list(): Promise<Nullable<Nullable<RetreatStatistics>[]>> {
        return this.get(`stats/list`, {
            
        }, {
            
        });
    }

    async create(statistics: Nullable<RetreatStatistics>): Promise<void> {
        return this.put(`stats/create`, {
            
        }, {
            ['statistics']: statistics,
        });
    }

};
export interface IRetreatStatisticsApi {
    list(): Promise<Nullable<Nullable<RetreatStatistics>[]>>;
    create(statistics: Nullable<RetreatStatistics>): Promise<void>;
}
