export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): {message: string, field?: string}[];
}