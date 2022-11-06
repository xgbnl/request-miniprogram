/**
 * @class
 */
export class Helper {

    /**
     * 消息提示框
     * @static
     * @param msg
     * @param duration
     * @param icon
     */
    static message(msg, duration = 2000, icon = 'none',) {
        wx.showToast({
            title: msg,
            icon: icon,
            duration: duration,
            mask: false
        })
    }

    /**
     * 获取时间戳
     * @static
     * @returns {number}
     */
    static timestamps() {
        return Date.now();
    }
}