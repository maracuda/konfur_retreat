export class ApiError extends Error {
    public constructor(public reason: string, public statusCode: number) {
        super(`StatusCode: ${statusCode}. Reason: ${reason}`);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
