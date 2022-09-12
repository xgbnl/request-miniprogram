import { Interceptor } from "./Interceptor";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { Helper } from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    #application = null;

    constructor(application) {
        super();
        this.#application = application;
    }

    interceptor({ code, msg }) {

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                Helper.trigger(msg ?? '您的登录状态已过期，请重新登录', 3000);
                this.#application.redirectToAuthPage();
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.trigger(msg ?? '您没有访问的权限',3000);
                break;
            case ResponseEnum.NOT_FOUND:
                Helper.trigger(msg ?? '页面好像走丢了',3000);
                this.#application.redirectToHomePage();
                break;
            case ResponseEnum.VALIDATE:
                Helper.trigger(msg);
                break;
            case ResponseEnum.ERROR:
                Helper.trigger(msg);
                break;
        }
    }
}