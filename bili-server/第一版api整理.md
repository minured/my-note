简单整理一下当前的api，方便后继升级
## 身份验证
http request header:
```js
Authorization: Bearer {token string}
```

## 用户服务
### 注册
```js
route: /register
method: POST
body: {
    username {string}
    password {string}
    nickname {string}
}
```
### 登录
```js
route: /login
method: POST
body: {
    username {string}
    password {string}
}
```
### 当前用户信息
```js
route: /user
method: GET
```
### 更新用户信息
```js
route: /user
method: PUT
body: {
    gender {0 | 1}
    nickname {string}
    userImg {string}
    userDesc {string}
}
```
### 用户的收藏列表
```js
route: /collections
method: GET
```

## 视频内容服务
### 获取视频目录
```js
route: /category
method: GET
```
### 指定目录下的视频
```js
route: /category/[categoryId]
method: GET
```
### 视频列表
```js
route: /video
method: GET
```
### 视频详情
```js
route: /video/[videoId]
method: GET
```
### 视频推荐 (当前假推荐，跟当前视频无关)
```js
route: /video/commend
method: GET
```
### 收藏视频
```js
route: /video/like
method: POST
body: { 
    videoId {string}
}
```
### 取消收藏
```js
route: /video/removeCollection
method: POST
body: { 
    videoId {string}
}
```
### 发表评论
```js
route: /comment
method: POST
body: {
    content {string}
    date {string}
    parentId {string | null}
    videoId {string}
}
```
### 获取评论
```js
route: /comment/[videoId]
method: GET
```
### 查询某视频收藏状态
```js
route: /video/like
method: GET
params: {
    videoId {string}
}
```


## 后台管理服务
### 管理员登陆
```js
route: /admin/login
method: POST
body {
    username {string}
    password {string}
}
```
### 用户列表
```js
route: /userlist
method: GET
```
### 添加视频
```js
route: /video
method: POST
body: {
    id {string}
    name {string}
    introduction {string}
    category {string}
}
```

## 其他
### 上传
```js
route: /upload/multer
method: POST
body: {
    file
}
```
### 获取上传资源
```js
route: /image/upload/[filename]
method: GET
```

/api/users/search