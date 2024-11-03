export interface ErrorResponse {
    message?: ErrorMessage | string;
    code?: StatusCode;
}

export type TokenPayload = {
    id: string;
    image: string;
};

export enum ErrorMessage {
    INVALID_CREDENTIALS = "Invalid email or password",
    UNAUTHORIZED = "You are not authorized to perform this action",
    TOKEN_EXPIRED = "Your session has expired. Please log in again",
    TOKEN_INVALID = "Invalid authentication token",
    ERROR_DEFAULT = "Oops! 😞,Unknown Error Occurred",
    NOT_FOUND = "The requested resource was not found",
    ALREADY_EXISTS = "This resource already exists",
}


export enum StatusCode {
    Success = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentError = 402,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
}

export interface ShareOption {
    name: string;
    icon: React.ReactNode;
    color: string;
    hoverColor: string;
    shareUrl: (url: string) => string;
}

export class CustomError extends Error {
    statusCode:StatusCode
    constructor(message:string,statusCode:StatusCode){
        super();
        this.message = message
        this.statusCode = statusCode;
    }
}