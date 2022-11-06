import {Token} from "./Token";
import {Helper} from "../Helper/Helper";

export class Auth {
    #application = null;

    #TOKEN_KEY = 'Bearer';

    constructor(application) {
        this.#application = application;
    }

    /**
     * 登录
     * 存储令牌和过期时间
     * @param {*} scope
     * @param {*} expiration 天数转为秒
     */
    login(scope, expiration) {

        const token = Token.make(scope, expiration);

        wx.setStorageSync(this.#TOKEN_KEY, JSON.stringify(token));
    }

    /**
     * 返回token值
     */
    token() {
        return this.#resolveToken().getScope();
    }

    /**
     * 清除会话
     */
    logout() {
        wx.removeStorageSync(this.#TOKEN_KEY);
    }

    /**
     * 判断当前用户是否为访客
     * @returns {boolean}
     */
    guest() {
        return !wx.getStorageSync(this.#TOKEN_KEY);
    }

    /**
     * 监听器
     * 当token过期时，自动删除
     */
    listener() {
        const token = this.#resolveToken();

        const days = this.#formatExpirationToDays(token.getExpiration());

        const expirationTime = days * 24 * 3600 * 1000;

        const currentTime = Helper.timestamps();

        if ((currentTime - token.getEffectiveDate()) > expirationTime) {
            this.logout();
        }
    }

    /**
     * 将秒数转换为天数
     * @param {*} expiration
     * @returns
     */
    #formatExpirationToDays(expiration) {
        return Math.floor(expiration / (60 * 60 * 24));
    }

    /**
     * 解析令牌
     * @returns {Token}
     */
    #resolveToken() {
        const {scope, expiration, effectiveDate} = JSON.parse(wx.getStorageSync(this.#TOKEN_KEY));
        return Token.make(scope, expiration, effectiveDate);
    }
}