// tslint:disable
// TypeScriptContractGenerator's generated content
import { RetreatStatistics } from './../RetreatStatistics';
import { ApiBase } from './../apiBase/ApiBase';

export class RetreatStatisticsApi extends ApiBase implements IRetreatStatisticsApi {
    async list(): Promise<Nullable<Nullable<RetreatStatistics>[]>> {
        return this.get(`api/stats/list`, {
            
        }, {
            
        });
    }

    async create(statistics: Nullable<RetreatStatistics>): Promise<void> {
        return this.put(`api/stats/create`, {
            
        }, {
            ['statistics']: statistics,
        });
    }

};
export interface IRetreatStatisticsApi {
    list(): Promise<Nullable<Nullable<RetreatStatistics>[]>>;
    create(statistics: Nullable<RetreatStatistics>): Promise<void>;
}
