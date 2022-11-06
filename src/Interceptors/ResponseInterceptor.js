import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";
import {Helper} from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    #application = null;

    // 触发器,避免跳转重复触发
    #trigger = false;

    constructor(application) {
        super();
        this.#application = application;
    }

    interceptor({code, msg}) {

        switch (code) {
            case ResponseEnum.VALIDATE:
                this.#redirectAction(msg, true);
                break;
            case ResponseEnum.NOT_FOUND:
                this.#redirectAction(msg);
                break;
            default:
                Helper.message(msg);
                break;
        }
    }

    #redirectAction(msg, isAuth = false) {
        if (this.#trigger) {
            return false;
        }

        this.#trigger = false;

        // 如果为401，则跳转至授权页
        if (isAuth) {
            this.#application.redirectToAuthPage();
            return false;
        }

        // 如果返回404
        this.#application.toRedirectionPage();
        return false;
    }
}