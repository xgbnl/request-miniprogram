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
                this.#redirectToAuthPage();
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.trigger(msg ?? '您没有访问的权限',3000);
                break;
            case ResponseEnum.NOT_FOUND:
                Helper.trigger(msg ?? '页面好像走丢了',3000);
                this.#redirectToHomePage();
                break;
            case ResponseEnum.VALIDATE:
                Helper.trigger(msg);
                break;
            case ResponseEnum.ERROR:
                Helper.trigger(msg);
                break;
        }
    }

    #redirect(url) {
        wx.redirectTo({ url: url, });
    }

    #redirectToAuthPage() {
        setTimeout(() => {
            this.#redirect(this.#application.getAuthPage())
        }, 3000)
    }

    #redirectToHomePage() {
        setTimeout(() => {
            this.#redirect(this.#application.getHomePage())
        }, 3000)
    }
}