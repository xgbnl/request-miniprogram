import {BaseRequest} from "./BaseRequest.js";
import {ResponseEnum} from "../Enum/ResponseEnum";

export class Request extends BaseRequest {

    #responseInterceptor;

    constructor(reqInter, resInter, app) {
        super(reqInter, app);

        this.#responseInterceptor = resInter;
    }

    #request(url, options, upload = false) {
        return new Promise((resolve, reject) => {
            try {
                wx.request({
                    ...this.configure(url, options, upload),
                    success(response) {
                        this.#triggerInterceptor(response,resolve);
                    },
                    fail(error) {
                        reject(error)
                    }
                })

            } catch (e) {
                reject(e)
            }
        })
    }

    #upload(url, options) {
        return new Promise((resolve, reject) => {
            try {
                wx.uploadFile({
                    ...this.configure(url, options, true),
                    success(res) {
                        const response = JSON.parse(res.data);

                        this.#triggerInterceptor(response,resolve);
                    },
                    fail(error) {
                        reject(error)
                    }
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    #triggerInterceptor(response,resolve) {
        const {code, msg} = response;
        if (code === ResponseEnum.OK) {
            resolve(response);
        }

        if (ResponseEnum.status.includes(code)) {
            this.#responseInterceptor.interceptor({code: code, msg: msg});
            return false;
        }
    }

    /**
     * 获取或查询数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    get(url, options = {}) {
        return this.#request(url, {method: 'GET', data: options})
    }

    /**
     * 创建数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    store(url, options) {
        return this.#request(url, {method: 'POST', data: options})
    }

    /**
     * 更新数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    update(url, options) {
        return this.#request(url, {method: 'PATCH', data: options})
    }

    /**
     * 删除数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    destroy(url, options) {
        return this.#request(url, {method: 'DELETE', data: options})
    }

    /**
     * 上传文件
     * @param url
     * @param path
     * @param filename
     * @returns {Promise<*>}
     */
    upload(url, path, filename) {
        return this.#upload(url, {method: 'POST', filePath: path, filename: filename})
    }
}