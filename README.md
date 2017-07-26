# mock-express
mock data with express

### 用法
```
  git clone
  npm i
  npm run dev
```

### 说明
> config.js文件用来配置启动服务的端口

> data.js文件是模拟的数据接口,在此文件中可以添加你的接口
```
module.exports = {
    '/index': {
        "code": 0,
        "msg": "成功",
        "data": {
            "name": "zhan",
            "age": 18
        }
    }
}
```
> index文件是主文件