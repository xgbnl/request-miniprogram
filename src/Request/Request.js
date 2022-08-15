import {BaseRequest} from "./BaseRequest.js";
import {ResponseEnum} from "../Enum/ResponseEnum";

export class Request extends BaseRequest {

    #responseInterceptor;

    constructor(reqInter, resInter, app) {
        super(reqInter, app);

        this.#responseInterceptor = resInter;
    }

    #request(url, options, upload = false) {

        const that = this;

        return new Promise((resolve, reject) => {
            try {
                wx.request({
                    ...that.configure(url, options, upload),
                    success(response) {
                        that.#triggerInterceptor(response, resolve);
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

        const that = this;

        return new Promise((resolve, reject) => {
            try {
                wx.uploadFile({
                    ...that.configure(url, options, true),
                    success(response) {
                        that.#triggerInterceptor(response, resolve)
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

    #triggerInterceptor(response, resolve) {

        let jsonData = response.data;

        if (typeof jsonData === "string") {
            jsonData = JSON.parse(jsonData);
        }

        const {code, msg} = jsonData;
        if (ResponseEnum.success(code)) {
            resolve(jsonData);
        }

        if (ResponseEnum.ERRORS.includes(code)) {
            this.#responseInterceptor.interceptor({code,msg});
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
        return this.#request(url, {method: 'GET', data: options});
    }

    /**
     * 获取详情
     * @param {*} url 
     * @param {*} id 
     * @returns 
     */
    show(url,id){
        return this.#request(url, {method: 'POST', data: {id: id}});
    }

    /**
     * 创建数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    store(url, options) {
        return this.#request(url, {method: 'POST', data: options});
    }

    /**
     * 更新数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    update(url, options) {
        return this.#request(url, {method: 'PATCH', data: options});
    }

    /**
     * 删除数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    destroy(url, options) {
        return this.#request(url, {method: 'DELETE', data: options});
    }

    /**
     * 上传文件
     * @param url
     * @param path
     * @param filename
     * @returns {Promise<*>}
     */
    upload(url, path, filename) {
        return this.#upload(url, {method: 'POST', filePath: path, filename: filename});
    }
}