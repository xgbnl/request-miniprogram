import {Request} from "../Request/Request.js";
import {InterceptorFactory} from "./InterceptorFactory";

const app = getApp();

export class HttpFactory {

    static getRequest() {
        return new Request(
            InterceptorFactory.getRequestInterceptor(),
            InterceptorFactory.getResponseInterceptor(),
            app,
        );
    }

}