export class Abstract {
    #host;
    #headers;
    #configs;

    constructor() {
        const app = getApp();
        this.#host = app.globalData.host;

        this.#headers = {
            json: 'application/json; charset=UTF-8',
            form: 'multipart/form-data',
        };
    }

    requestOptions(url, options, upload = false) {

        this.#configs = {
            url: `${this.#host}${this.#prefix(url)}`,
            method: options.method,
            data: options.method === 'GET' ? options.data : JSON.stringify(options.data),
            header: {
                'Content-Type': upload ? this.#headers.form : this.#headers.json,
            },
        };

        this.#BearerAuthorization();

        // 解决微信不支持PATCH请求
        if (options.method === 'PATCH') {
            this.#setRequestPatch();
        }

        if (upload) {
            this.#setUpload(options);
        }

        return this.#configs;
    }

    #BearerAuthorization() {
        const token = wx.getStorageSync('access_token');

        if (token) {
            this.#configs.header['Authorization'] = `Bearer ${token}`;
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

    #prefix(needle) {
        return needle.startsWith('/') ? needle : `/${needle}`;
    }
}