### wechat-crud

> 基于 `RESTful API` 标准封装的基于微信小程序请求器

### 配置

编辑`app.js`,新增 `blobalData.host`

```javascript
App({
    onLaunch: function () {
    },
    onShow: function () {
        updateManager();
    },
    globalData: {
        host: 'http://laravel.test'
    }
});
```

## 简单使用

```shell
npm i wechat-crud
```

然后选择微信开发者工具的菜单栏 `"工具"` --- `"构建npm"` 再引用就可以使用

```javascript
import http from "wechat-crud";
```

### 拦截器

内置前后拦截器,拦截器触发规则:

- 请求前会检查域名配置，如果未配置域名会触发前置拦截器，提示形式为: `wx.showToast`

- 当响应码返回`[401,403,404,422,500]`情况时，后拦截器会被触发，展示形式依然为: `wx.showToast`

### 请求`api`前辍 `/`

可以写成 `/users` 或 `users` ,请求器内部会进行处理

### `toeken`和请求头

请使用以下`方法`和`键`存储你的 

```javascript
wx.setStorageSync('access_token', '60JEwsLVlmKaurICnkmuZ')
```

请求头将携带`Authorization`发送 `token`

```
Authorization: Bearer 60JEwsLVlmKaurICnkmuZ7xxxxxxx
```

## 方法集

### 获取数据或查询

```javascript
http.get('users').then((response) => {

    console.log(response);
    // {msg:null,data:{},code:200}
})

// 查询
const data = {name: '张三', number: 123456789,};

http.get('users', data).then((response) => {
    // TOODO
})

```
### 增

```javascript
const data = {
    name: 'jack',
    age: 20,
    sex: 1,
};

http.store('users', data).then((response) => {
    // TOODO
})
```

### 改

```javascript
const data = {
    id: 1,
    name: 'jack',
    age: 20,
    sex: 1,
};

http.update('users', data).then((response) => {
    // TOODO
})
```

### 删除与批量删除

```javascript
http.destroy('users', {id: 1}).then((response) => {
    //TOODO
})

// 批量删除
const ids = [1, 2, 3, 4, 5];

http.destroy('users', ids).then((response) => {
    //TOODO
})
```


### 上传文件

```javascript
const file = e.detail.files[0];

http.upload('users/upload', file.url, 'filename').then((response) => {

})
```

### 开源协议

MIT
