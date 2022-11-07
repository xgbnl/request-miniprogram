import {Token} from "./Token";
import {Helper} from "../Helper/Helper";

export class Auth {
    /**
     * @type {Application}
     */
    #application = null;

    #TOKEN_KEY = 'Bearer';

    /**
     * @param application
     */
    constructor(application) {
        this.#application = application;
    }

    /**
     * 登录
     * 存储令牌和过期时间
     * @param {string} scope
     * @param {number} expiration 天数转为秒
     * @return {void}
     */
    login(scope, expiration) {

        const token = Token.make(scope, expiration);

        wx.setStorageSync(this.#TOKEN_KEY, JSON.stringify(token));
    }

    /**
     * 返回token值
     * @return {string}
     */
    token() {
        return this.#resolveToken().getScope();
    }

    /**
     * 清除会话
     * @return {void}
     */
    logout() {
        wx.removeStorageSync(this.#TOKEN_KEY);
    }

    /**
     * 判断当前用户是否为访客
     * @returns {boolean}
     */
    guest() {
        return !this.check();
    }

    /**
     * 判断用户是否已登录
     * @returns {boolean|string}
     */
    check() {
        return this.#getStorageToken();
    }

    /**
     * 监听器
     * 当token过期时，自动删除
     * @returns {void |boolean}
     */
    listener() {
        const token = this.#resolveToken();

        if (token === null) {
            return false;
        }

        const days = this.#formatExpirationToDays(token.getExpiration());

        const expirationTime = days * 24 * 3600 * 1000;

        const currentTime = Helper.timestamps();

        if ((currentTime - token.getEffectiveDate()) > expirationTime) {
            this.logout();
        }
    }

    /**
     * 返回一个Application实例
     * @returns {Application}
     */
    getApp() {
        return this.#application;
    }

    /**
     * 将秒数转换为天数
     * @param {number} expiration
     * @returns {number}
     */
    #formatExpirationToDays(expiration) {
        return Math.floor(expiration / (60 * 60 * 24));
    }

    /**
     * 解析令牌
     * @returns {Token|null}
     */
    #resolveToken() {

        if (this.guest()) {
            return null;
        }

        const {scope, expiration, effectiveDate} = JSON.parse(this.#getStorageToken());

        return Token.make(scope, expiration, effectiveDate);
    }

    /**
     * 获取令牌
     * @returns {*}
     */
    #getStorageToken() {
        return wx.getStorageSync(this.#TOKEN_KEY);
    }
}