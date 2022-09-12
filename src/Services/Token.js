export class Token {
    #key = null;

    /**
     * 设置令牌和过期时间
     * @param {*} token 
     * @param {*} expiration 
     */
    setToken(token, expiration) {
        const bearer = JSON.stringify({
            token,
            expiration,
            effectiveDate: Date.now(),
        });

        wx.setStorageSync(this.#app.getTokenKey(), bearer);
    }

    /**
     * 获取令牌
     */
    getToken() {
        return this.#resolve().token;
    }

    /**
     * 移除token
     */
    removeToken() {
        wx.removeStorageSync(this.#app.getTokenKey());
    }

    /**
     * 令牌为空
     * @returns 
     */
    isEmpty() {
        return !this.isNotEmpty();
    }

    /**
     * 令牌不为空
     * @returns 
     */
    isNotEmpty() {
        return wx.getStorageSync(this.#app.getTokenKey());
    }

    /**
     * 验证令牌是否有效
     */
    validateTokenValid() {
        const { expiration, effectiveDate } = this.#resolve();

        const days = this.#formatExpirationToDays(expiration);

        const expirationTime = days * 24 * 3600 * 1000;

        const currentTime = Date.now();

        if (currentTime - effectiveDate - expirationTime) {
            this.removeToken();
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
     * @returns 
     */
    #resolve() {
        return JSON.parse(wx.getStorageSync(this.#app.getTokenKey()));
    }
}