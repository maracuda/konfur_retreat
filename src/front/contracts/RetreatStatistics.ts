// tslint:disable
// TypeScriptContractGenerator's generated content
import { Guid } from './../domain/dataTypes/Guid';
import { DateTime } from './../domain/dataTypes/DateTime';

export type RetreatStatistics = {
    id: Guid;
    playerOneName: Nullable<string>;
    playerTwoName: Nullable<string>;
    startDateTime: DateTime;
    endDateTime: DateTime;
    mouseDistance: number;
    clicksCount: number;
    shortCutsCount: number;
};
