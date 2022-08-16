import {Helper} from "../Helper/Helper";
import {RequestEnum} from "../Enum/RequestEnum";

export class BaseRequest {
    #app;
    #headers;
    #configs;
    #requestInterceptor;

    constructor(reqInter, app) {
        this.#app = app;

        this.#headers = {
            json: 'application/json; charset=UTF-8',
            form: 'multipart/form-data',
        };

        this.#requestInterceptor = reqInter;
    }

    configure(url, options, upload = false) {

        const requestUrl = `${this.#app.getApi()}${this._prefix(url)}`;

        if (!this.#requestInterceptor.interceptor(requestUrl)) {
            this.abort('api域名不合法,请配置合法域名,如: http://laravel.test/api', 3000);
            return false;
        }

        this.#configs = {
            url: requestUrl,
            method: options.method,
            data: options.method === RequestEnum.GET ? options.data : this._stringify(options.data),
            header: {
                'Content-Type': upload ? this.#headers.form : this.#headers.json,
            },
        };

        if (this.#app.getStorageToken()) {
            this.#bearerAuthorization();
        }

        // 解决微信不支持PATCH请求
        if (options.method === RequestEnum.PATCH) {
            this.#setRequestPatch();
        }

        if (upload) {
            this.#setUpload(options);
        }

        return this.#configs;
    }

    #bearerAuthorization() {
        if ((this.#app.getHeader() === 'Authorization') && (this.#app.getTokenType() === 'Bearer')) {
            this.#configs.header[this.#app.getHeader()] = `${this.#app.getTokenType()} ${this.#app.getStorageToken()}`;
        } else {
            this.#configs.header[this.#app.getHeader()] = this.#app.getStorageToken();
        }
    }

    #setUpload(options) {
        delete this.#configs.data;
        this.#configs.filePath = options.filePath;
        this.#configs.name = options.filename;
    }

    #setRequestPatch() {
        this.#configs.method = RequestEnum.POST;
        this.#configs.header['X-HTTP-Method-Override'] = RequestEnum.PATCH;
    }

    _prefix(haystack, prefix = '/') {
        return haystack.startsWith(prefix) ? haystack : `${prefix}${haystack}`;
    }

    _stringify(haystack) {
        return JSON.stringify(haystack);
    }

    abort(msg, duration = 2000, icon = 'none',) {
        Helper.abort(msg, icon, duration)
    }
}