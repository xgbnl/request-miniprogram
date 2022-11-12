### request-miniprogram

> 基于`wx.request`二次封装的请求器

## 安装

```shell
npm i request-miniprogram
```

然后选择微信开发者工具的菜单栏 `"工具"` --- `"构建npm"` 再引用就可以使用

## 简单使用

### Application

```js
import {Application} from "request-miniprogram"

// 该方法接收一个对象,用于该单例的配置初始化
Application.configure({});

// 获取请求api地址
Application.getHost();

// 重定向至授权页
Application.redirectToAuthPage();

// 重定向页面
Application.toRedirectionPage();
```

### 配置

`app.js`

```javascript
import {Application} from "request-miniprogram"

App({
    onLaunch: function () {
        // 应用启动时初始化配置
        Application.configure({
            host: 'http://laravel.test/api', // 全局请求api
            authPage: '/pages/auth/index', // 授权页
            redirectPage: '/pages/home/index', // 重定向页面
        });
    },
});
```

### Auth 类

```js
import {Auth} from "request-miniprogram";

// 登录
Auth.login(scope, expiration);

// 获取令牌
Auth.token();

// 清除会话
Auth.logout();

// 监听器,当令牌失效时，将自动删除令牌，并退出当前会话
Auth.listener();

// 判断当前用户是否为访客
Auth.guest();

// 判断当前用户是否登录
Auth.check();

// 获取Application实例
Auth.getApp();
```

**存储token例子**

```javascript

auth().then((response) => {
    const {token_type, access_token, expiration} = response.data;

    Auth.login(access_token, expiration);
});


```

### 拦截器

- 前置拦截器

> 请求前会进行api域名检查，如果未配置或配置错误，将被触发

- 后置拦截器

> 当后端返回 `401,403,404,422,500`状态码时，该拦截器将被触发

> 当状态码为`401`时,需要验证的页面将会跳转至授权页

> 当状态码为`404`时,会跳转至首页

### Request方法集

```javascript
import {RESTFul} from "request-miniprogram";
```

#### 获取资源

请求器会自动为您处理请求接口,可以根据你的个人习惯书写为: `/users`或`users`

> 请求方式: `GET`

```javascript
RESTFul.get('users').then((response) => {
    // DoSomething...
})

// 查询/获取资源
const query = {name: '张三', phone: 15689324465,};

RESTFul.get('users', query).then((response) => {
    // DoSomething...
})
```

#### 资源详情

> 请求方式: `POST`

```javascript

const uid = 22;

RESTFul.getDetails('users', uid).then((response) => {
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

RESTFul.post('users', user).then((response) => {
    // DoSomething...
})
```

#### 更新资源

> 请求方式: `PATCH`

```javascript
const user = {
    id: 1,
    name: 'jack',
    age: 20,
    sex: 1,
};

RESTFul.update('users', user).then((response) => {
    // DoSomething...
})
```

#### 删除资源

> 请求方式: `DELETE`

```javascript
const id = 20;

RESTFul.delete('users', {id}).then((response) => {
    // DoSomething...
})

// 批量删除
const ids = [1, 2, 3, 4, 5];

RESTFul.delete('users', ids).then((response) => {
    // DoSomething...
})
```

#### 上传资源

> 请求方式: `POST`

```javascript
const file = e.detail.files[0];
const directory = '/var/html/images'

RESTFul.upload('users/upload', {filePath: file, fileName: 'img', uploadDirectory: directory}).then((response) => {
    // Dosomething
})
```

#### 开源协议

MIT
