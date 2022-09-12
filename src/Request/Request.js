import {Helper} from "../Helper/Helper";
import {RequestEnum} from "../Enum/RequestEnum";

export class Request {
    #application;
    #headers;
    #configs;
    #requestInterceptor;
    #auth;

    constructor(reqInter, application,auth) {
        this.#application = application;
        this.#auth = auth;

        this.#headers = {
            json: 'application/json; charset=UTF-8',
            form: 'multipart/form-data',
        };

        this.#requestInterceptor = reqInter;
    }

    configure(url, options, upload = false) {

        const requestUrl = `${this.#application.getHost()}${this._prefix(url)}`;

        if (!this.#requestInterceptor.interceptor(requestUrl)) {
            Helper.trigger('请配置请求域名', 3000);
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

        if (this.#auth.isNotEmpty()) {
            this.#configs.header['Authorization'] ='Bearer ' + this.#auth.getToken();
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

    #setUpload(options) {
        delete this.#configs.data;
        this.#configs.filePath = options.filePath;
        this.#configs.name = options.fileName;
        this.#configs.formData.uploadDirectory = options.uploadDirectory;
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
}