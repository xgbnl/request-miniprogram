import {RequestInterceptor} from "../Interceptors/RequestInterceptor";
import {ResponseInterceptor} from "../Interceptors/ResponseInterceptor";

export class InterceptorFactory {

  static  getRequestInterceptor() {
        return new RequestInterceptor();
    }

  static  getResponseInterceptor(app) {
        return new ResponseInterceptor(app);
    }
}