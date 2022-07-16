export class ResponseEnum {

    static OK = 200;

    static UNAUTHORIZED = 401;

    static FORBIDDEN = 403;

    static NOT_FOUND = 404;

    static VALIDATE = 422;

    static ERROR = 500;

    static status = [
        ResponseEnum.UNAUTHORIZED,
        ResponseEnum.FORBIDDEN,
        ResponseEnum.NOT_FOUND,
        ResponseEnum.VALIDATE,
        ResponseEnum.ERROR
    ];
}