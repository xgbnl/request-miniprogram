import {Interceptor} from "./Interceptor";
import {ResponseEnum} from "../Enum/ResponseEnum";

export class ResponseInterceptor extends Interceptor {

    interceptor(params) {

        const {code, msg} = params;

        switch (code) {
            case ResponseEnum.UNAUTHORIZED:
                this._trigger('无效访问令牌');
                break;
            case ResponseEnum.FORBIDDEN:
                this._trigger('访问被禁止');
                break;
            case ResponseEnum.NOT_FOUND:
                this._trigger('页面不存在');
                break;
            case ResponseEnum.VALIDATE:
                this._trigger(msg);
                break;
        }
    }
}