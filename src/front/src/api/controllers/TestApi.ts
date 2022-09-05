import {ApiBase} from "../ApiBase";

export class TestApi extends ApiBase {
    public async test(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        });
        // return this.get(`/test`);
    }
}
