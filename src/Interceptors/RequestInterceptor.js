import {Interceptor} from "./Interceptor";

export class RequestInterceptor extends Interceptor {

    interceptor(params) {
        return this._urlRegExp(params);
    }

}