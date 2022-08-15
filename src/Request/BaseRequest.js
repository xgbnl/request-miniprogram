import {Helper} from "../Helper/Helper";

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
            this.abort('域名不合法,请配置合法域名,如: http://laravel.test/api');
            return false;
        }

        this.#configs = {
            url: requestUrl,
            method: options.method,
            data: options.method === 'GET' ? options.data : this._stringify(options.data),
            header: {
                'Content-Type': upload ? this.#headers.form : this.#headers.json,
            },
        };

        this.#bearerAuthorization();

        // 解决微信不支持PATCH请求
        if (options.method === 'PATCH') {
            this.#setRequestPatch();
        }

        if (upload) {
            this.#setUpload(options);
        }

        return this.#configs;
    }

    #bearerAuthorization() {
        const token = wx.getStorageSync(this.#app.getStorageKey());

        if (token) {
            this.#configs.header['Authorization'] = `${this.#app.getTokenType()} ${token}`;
        }
    }

    #setUpload(options) {
        delete this.#configs.data;
        this.#configs.filePath = options.filePath;
        this.#configs.name = options.filename;
    }

    #setRequestPatch() {
        this.#configs.method = 'POST';
        this.#configs.header['X-HTTP-Method-Override'] = 'PATCH';
    }

    _prefix(haystack, prefix = '/') {
        return haystack.startsWith(prefix) ? haystack : `${prefix}${haystack}`;
    }

    _stringify(haystack) {
        return JSON.stringify(haystack);
    }

    abort(msg, icon = 'none', duration = 2000) {
        Helper.abort(msg, icon, duration)
    }
}