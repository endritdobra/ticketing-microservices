import {CustomError} from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404;

    serializeErrors() {
        return [{
            message: "Route not found",
        }]
    }
}