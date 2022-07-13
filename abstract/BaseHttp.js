export class BaseHttp {
    #host;
    #headers;

    constructor() {
        const app = getApp();

        this.#host = app.globalData.host;

        this.#headers = {
            json: 'application/json; charset=UTF-8',
            form: 'multipart/form-data',
        };
    }

    /**
     * 元数据
     * @param url
     * @param options
     * @param upload
     * @returns {{method: *, data: (*|string), header: {"Content-Type": (string|HTMLFormElement|*|(() => any)|(() => Promise<any>))}, url: string}}
     */
    requestOptions(url, options, upload = false) {

        const config = {
            url: `${this.#host}${this.#prefix(url)}`,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': upload ? this.#headers.form : this.#headers.json,
            },
        };

        // 解决微信不支持PATCH请求
        if (options.method === 'PATCH') {
            config.method = 'POST';
            config.header['X-HTTP-Method-Override'] = 'PATCH';
        }

        if (upload) {
            delete config.data;
            config.filePath = options.filePath;
            config.name = options.filename;
        }

        return config;
    }

    /**
     * Add prefix
     * @param needle
     * @returns {*|string}
     */
    #prefix(needle) {
        return needle.startsWith('/') ? needle : `/${needle}`;
    }
}