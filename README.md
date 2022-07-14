### wechat-crud
> 按照标准 `RESTful API` 封装的基于微信小程序请求类

### 配置
编辑`app.js`,新增 `blobalData.host`
```javascript
App({
  onLaunch: function () {},
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

```javascript
import http from "../../../wechat-http/http";
```

### 关于`api`前辍 `/`
可加可不加，如果不加，请求器会自动加上

### 获取
```javascript
http.get('users').then((response) => {
    
    console.log(response);
    // {msg:null,data:{},code:200}
})
```
### 查
```javascript
const data = {name:'张三',number: 123456789,};

http.get('users',data).then((response) => {
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

http.store('users',data).then((response) => {
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

http.update('users',data).then((response) => {
    // TOODO
})
```

### 删
```javascript
http.destroy('users',{id: 1}).then((response) => {
    //TOODO
})
```

### 批量删除
```javascript
const ids = [1,2,3,4,5];

http.destroy('users',ids).then((response) => {
    //TOODO
})
```

### 上传图片
```javascript
const file = e.detail.files[0];

http.upload('users/upload',file.url,'filename').then((response) => {

})
```