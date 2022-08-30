import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";
import {Helper} from "../Helper/Helper";

export class ResponseInterceptor extends Interceptor {

    #app

    constructor(app) {
        super();
        this.#app = app;
    }

    interceptor({code, msg}) {

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                Helper.trigger(
                    this.#app.getInvalidStatus()
                        ? this.#app.getCustomInvalidMessage()
                        : msg,
                );
                this.#redirectToAuthPage();
                break;
            case ResponseEnum.FORBIDDEN:
                Helper.trigger(msg ?? '访问被禁止');
                break;
            case ResponseEnum.NOT_FOUND:
                Helper.trigger(msg ?? '页面不存在');
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
        wx.redirectTo({url: url,});
    }

    #redirectToAuthPage() {
        setTimeout(() => {
            this.#redirect(this.#app.getAuthPage())
        }, 3000)
    }

    #redirectToHomePage() {
        setTimeout(() => {
            this.#redirect(this.#app.getHomePage())
        }, 3000)
    }
}