import { Request } from "./Request.js";
import { ResponseEnum } from "../Enum/ResponseEnum";
import { RequestEnum } from "../Enum/RequestEnum";

export class RESTFul extends Request {

    #responseInterceptor;

    constructor(reqInter, resInter, application, token) {
        super(reqInter, application, token);

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

        const { code, msg } = jsonData;
        if (ResponseEnum.success(code)) {
            resolve(jsonData);
        }

        if (ResponseEnum.ERRORS.includes(code)) {
            this.#responseInterceptor.interceptor({ code, msg });
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
        return this.#request(url, { method: RequestEnum.GET, data: options });
    }

    /**
     * 获取详情
     * @param {*} url
     * @param {*} id
     * @returns
     */
    getDetails(url, id) {
        return this.#request(url, { method: RequestEnum.POST, data: { id: id } });
    }

    /**
     * 创建数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    post(url, options) {
        return this.#request(url, { method: RequestEnum.POST, data: options });
    }

    /**
     * 更新数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    update(url, options) {
        return this.#request(url, { method: RequestEnum.PATCH, data: options });
    }

    /**
     * 删除数据
     * @param url
     * @param options
     * @returns {Promise<*>}
     */
    delete(url, options) {
        return this.#request(url, { method: RequestEnum.DELETE, data: options });
    }

    /**
     * 上传文件
     * @param url
     * @param filePath
     * @param fileName
     * @param uploadDirectory
     * @returns {Promise<*>}
     */
    upload(url, { filePath, fileName, uploadDirectory }) {
        return this.#upload(url, { method: RequestEnum.POST, filePath, fileName, uploadDirectory });
    }
}