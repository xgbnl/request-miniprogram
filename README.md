### wechat-custom-request

> 基于 `RESTful API` 标准封装的基于微信小程序请求器

### 配置

`app.js`

```javascript
import { appConfig } from "wechat-custom-request"

App({
    onLaunch: function () {
        this.initAppConfig();
    },
    
    initAppConfig(){
        appConfig.configure({
            api: 'http://laravel.test/api', // 全局请求api
            loginPage: '/pages/auth/login/index', // 登录页,后端返回401时会跳转至授权页
            homePage: '/pages/home/index', // 首页,后端返回404时跳转至首页
            tokenType: 'Bearer', // 可选，token类型
            storageKey: 'access_token' // 可选，本地存储token键
        });
    },
    
});
```

## 简单使用

```shell
npm i wechat-custom-request
```

然后选择微信开发者工具的菜单栏 `"工具"` --- `"构建npm"` 再引用就可以使用

```javascript
import {request} from "wechat-custom-request";
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
request.get('users').then((response) => {

    console.log(response);
    // {msg:null,data:{},code:200}
})

// 查询
const data = {name: '张三', number: 123456789,};

request.get('users', data).then((response) => {
    //TODO
})

```

### 详情

```javascript
request.show('users',1).then((response) => {
    //TODO
})

```


### 增

```javascript
const data = {
    name: 'jack',
    age: 20,
    sex: 1,
};

request.store('users', data).then((response) => {
    //TODO
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

request.update('users', data).then((response) => {
    //TODO
})
```

### 删除与批量删除

```javascript
request.destroy('users', {id: 1}).then((response) => {
    //TODO
})

// 批量删除
const ids = [1, 2, 3, 4, 5];

request.destroy('users', ids).then((response) => {
    //TODO
})
```


### 上传文件

```javascript
const file = e.detail.files[0];

request.upload('users/upload', file.url, 'filename').then((response) => {

})
```

### 开源协议

MIT
