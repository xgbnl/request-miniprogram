import {Helper} from "../Helper/Helper";

export class Token {
    #scope = null; // 令牌
    #expiration = null; // 过期时间
    #effectiveDate = null; // 令牌生效时间

    constructor(scope, expiration, effectiveDate) {
        this.#scope = scope;
        this.#expiration = expiration;
        this.#effectiveDate = (effectiveDate !== null) ? effectiveDate : Helper.timestamps();
    }

    /**
     * 获取令牌
     * @returns {string}
     */
    getScope = () => {
        return this.#scope;
    }

    /**
     * 获取过期时间
     * @returns {string}
     */
    getExpiration = () => {
        return this.#expiration;
    }

    /**
     * 获取生效时间
     * @returns {string}
     */
    getEffectiveDate = () => {
        return this.#effectiveDate;
    }

    /**
     * 返回令牌实例
     * @param scope
     * @param expiration
     * @param effectiveDate
     * @returns {Token}
     */
    static make = ({scope, expiration, effectiveDate = null}) => {
        return new Token(scope, expiration, effectiveDate);
    }
}