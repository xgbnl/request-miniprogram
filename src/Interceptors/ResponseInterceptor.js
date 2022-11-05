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
                Helper.trigger(msg);
                break;
        }
    }

    #redirectAction(msg, isAuth = false) {
        if (this.#trigger) {
            return false;
        }

        this.#trigger = false;

        if (isAuth) {
            this.#application.redirectToAuthPage();
            return false;
        }

        this.#application.redirectToRedirectionPage();
        return false;
    }
}