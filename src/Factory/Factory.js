import {RESTFul} from "../Request/RESTFul";
import {Auth} from "../Services/Auth";
import {RequestInterceptor} from "../Interceptors/RequestInterceptor";
import {ResponseInterceptor} from "../Interceptors/ResponseInterceptor";

export class Factory {

    /**
     * 创建授权类实例
     * @param app
     * @returns {Auth}
     */
    static makeAuth(app) {
        return new Auth(app)
    }

    /**
     * 创建请求器实例
     * @param app
     * @param auth
     * @returns {RESTFul}
     */
    static makeRESTFul(app, auth) {
        return new RESTFul(
            new RequestInterceptor(),
            new ResponseInterceptor(app),
            app,
            auth);
    }
}