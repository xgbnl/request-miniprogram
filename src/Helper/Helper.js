export class Helper {

    static trigger(msg, duration = 2000, icon = 'none',) {
        wx.showToast({
            title: msg,
            icon: icon,
            duration: duration,
            mask: false
        })
    }

}