import {BaseHttp} from "./abstract/BaseHttp";

class Http extends BaseHttp {

    constructor() {
        super();
    }

    /**
     * @param url
     * @param options
     * @param upload
     * @returns {Promise<unknown>}
     */
    #request(url, options, upload = false) {
        return new Promise((resolve, reject) => {
            try {
                wx.request({
                    ...this.requestOptions(url, options, upload),
                    success(response) {
                        if (response.data.code === 200) {
                            resolve(response.data)
                        }
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

    /**
     * @param url
     * @param options
     * @returns {Promise<unknown>}
     */
    #upload(url, options) {
        return new Promise((resolve, reject) => {
            try {
                wx.uploadFile({
                    ...this.requestOptions(url, options, true),
                    success(res) {
                        const response = JSON.stringify(res.data);
                        if (response.code === 200) {
                            resolve(response);
                        }
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

const http = new Http();

module.exports = http;

