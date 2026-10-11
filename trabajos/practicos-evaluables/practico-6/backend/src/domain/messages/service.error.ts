import { AppError } from './error-type.constants';

export class ServiceError extends Error {
    public readonly statusCode: number;

    constructor(error: AppError | string) {
        const message = typeof error === 'string' ? error : error.message;
        super(message);
        this.name = 'ServiceError';
        this.statusCode = typeof error === 'object' && error.statusCode ? error.statusCode : 400;
        Object.setPrototypeOf(this, ServiceError.prototype);
    }
}
