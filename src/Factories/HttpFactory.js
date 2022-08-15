import {Request} from "../Request/Request.js";
import {InterceptorFactory} from "./InterceptorFactory";
import {AppConfig} from "../Config/AppConfig";

export class HttpFactory {

    static getRequest() {
        return new Request(
            InterceptorFactory.getRequestInterceptor(),
            InterceptorFactory.getResponseInterceptor(AppConfig.getInstance()),
            AppConfig.getInstance(),
        );
    }
}