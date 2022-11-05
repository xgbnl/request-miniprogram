import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";
import {Helper} from "../Helper/Helper";
import {Auth} from "../index";

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
            case ResponseEnum.UNAUTHORIZED:
                this.listenerTrigger(msg, true);
                break;
            case ResponseEnum.FORBIDDEN:
                this.listenerTrigger(msg);
                break;
            case ResponseEnum.NOT_FOUND:
                this.listenerTrigger(msg);
                break;
            case ResponseEnum.VALIDATE:
                this.listenerTrigger(msg);
                break;
            case ResponseEnum.ERROR:
                this.listenerTrigger(msg);
                break;
        }
    }

    listenerTrigger(msg, isAuth = false) {
        if (this.#trigger) {
            return false;
        }

        if (!isAuth) {
            Helper.trigger(msg, 300);
            return this.setTrigger();
        }

        if (this.#application.getListenerPages(this.#application.getCurrentPage())) {

            if (Auth.isEmpty()) {
                this.setTrigger();
                return this.#application.redirectToAuthPage();
            }

            this.#application.redirectToAuthPage();

            return this.setTrigger();
        }

    }

    setTrigger() {
      return this.#trigger = true;
    }
}