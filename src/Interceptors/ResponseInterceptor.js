import { Interceptor } from "./Interceptor";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { Helper } from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    #application = null;
    #redirection = false;

    constructor(application) {
        super();
        this.#application = application;
    }

    interceptor({ code, msg }) {

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                if (!this.#redirection) {
                    this.#redirect();
                }
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.trigger(msg ?? '您没有访问的权限',3000);
                break;
            case ResponseEnum.NOT_FOUND:
                if (!this.#redirection) {
                    this.#redirect(false);
                }
                break;
            case ResponseEnum.VALIDATE:
                Helper.trigger(msg);
                break;
            case ResponseEnum.ERROR:
                Helper.trigger(msg);
                break;
        }
    }

    #redirect(authorize = true) {
        Helper.trigger(authorize ? '您的登录状态已过期，请重新登录' : '访问的页面不存在',3000);
        this.#redirect = true;
        if(authorize) {
            this.#application.redirectToAuthPage();
            return false;
        }

        this.#application.redirectToHomePage();
        return false;
    }
}