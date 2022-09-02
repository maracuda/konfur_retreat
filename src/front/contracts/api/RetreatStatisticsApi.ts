// tslint:disable
// TypeScriptContractGenerator's generated content
import { RetreatStatistics } from './../RetreatStatistics';
import { ApiBase } from './../apiBase/ApiBase';

export class RetreatStatisticsApi extends ApiBase implements IRetreatStatisticsApi {
    async get(): Promise<Nullable<Nullable<RetreatStatistics>[]>> {
        return this.get(`[controller]`, {
            
        }, {
            
        });
    }

    async put(statistics: Nullable<RetreatStatistics>): Promise<void> {
        return this.put(`[controller]`, {
            
        }, {
            ['statistics']: statistics,
        });
    }

};
export interface IRetreatStatisticsApi {
    get(): Promise<Nullable<Nullable<RetreatStatistics>[]>>;
    put(statistics: Nullable<RetreatStatistics>): Promise<void>;
}
