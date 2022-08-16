### wechat-custom-request

> 基于 `RESTful API` 标准封装的基于微信小程序请求器

## 安装

```shell
npm i wechat-custom-request
```

然后选择微信开发者工具的菜单栏 `"工具"` --- `"构建npm"` 再引用就可以使用

## 简单使用

### AppConfig

全局配置不再由小程序app实例提供，将由`AppConfig`这个单例类来为请求器提供所需配置，下面展示它有哪些实例方法：

方法集

```js
import {appConfig} from "wechat-custom-request"

// 该方法接收一个对象,用于该单例的配置初始化
appConfig.configure({});

// 获取token类型
appConfig.getTokenType();

// 获取存储在本地的token
appConfig.getStorageToken();

// 获取请求头名称
appConfig.getHeader();

// 获取存储在本地的令牌名称
appConfig.getStorageKey();

// 获取请求api地址
appConfig.getApi();

// 获取授权页面
appConfig.getAuthPage();

// 获取首页
appConfig.getHomePage();
```

### 配置

`app.js`

```javascript
import {appConfig} from "wechat-custom-request"

App({
    onLaunch: function () {
        this.initAppConfig();
    },

    // 不再依赖app的globalData
    initAppConfig() {

        appConfig.configure({
            api: 'http://laravel.test/api', // 全局请求api
            authPage: '/pages/auth/index', // 后端返回401时会跳转至授权页
            homePage: '/pages/home/index', // 后端返回404时跳转至首页
            header: 'Authorization', // 请求头token标志
            storageKey: 'access_token',// 选填,本地存储token键,默认为access_token
            tokenType: 'Bearer', // 选填,token类型如果为Bearer,请求头为:Authorization时，请求头将由 Bearer + token 报文发式发出
        });

    },
});
```

### 拦截器

- 前置拦截器

> 请求前会进行api域名检查，如果未配置或配置错误，将被触发

- 后置拦截器

> 当后端返回 `401,403,404,422,500`状态码时，该拦截器将被触发

> 当状态码为`401`时,会跳转至授权页

> 当状态码为`404`时,会跳转至首页

### Request方法集

```javascript
import { request } from "wechat-custom-request";
```

#### 获取资源

请求器会自动为您处理请求接口,可以根据你的个人习惯书写为: `/users`或`users`

> 请求方式: `GET`

```javascript
request.get('users').then((response) => {
    // DoSomething...
})

// 查询
const user = {name: '张三', phone: 15689324465,};

request.get('users', user).then((response) => {
    // DoSomething...
})
```

#### 资源详情

> 请求方式: `POST`

```javascript

const uid = 22;

request.show('users', uid).then((response) => {
    // DoSomething...
})

```

#### 创建资源

> 请求方式: `POST`

```javascript
const user = {
    name: 'jack',
    age: 20,
    sex: 1,
};

request.store('users', user).then((response) => {
    // DoSomething...
})
```

#### 更新资源

```javascript
const user = {
    id: 1,
    name: 'jack',
    age: 20,
    sex: 1,
};

request.update('users', user).then((response) => {
    // DoSomething...
})
```

#### 删除资源

> 请求方式: `DELETE`

```javascript
const id = 20;

request.destroy('users', {id}).then((response) => {
    // DoSomething...
})

// 批量删除
const ids = [1, 2, 3, 4, 5];

request.destroy('users', ids).then((response) => {
    // DoSomething...
})
```

#### 上传资源

> 请求方式: 伪`PATCH`

```javascript
const file = e.detail.files[0];

request.upload('users/upload', file.url, 'filename').then((response) => {
    // Dosomething
})
```

#### 开源协议

MIT
