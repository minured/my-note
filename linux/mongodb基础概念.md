## 概述
    每次mongodb的安装和配置都要查阅大量资料，网上资料又参差不齐，需要花费大量时间，所以记录下mongodb安装过程和踩的一些坑，方便后续查阅。

## 安装
1. 添加源：在`/etc/yum.repos.d/`下创建`mongodb.repo`，写入
```conf
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```
延伸阅读：`yum`/`yum.repos.d/`目录/`.repo`文件配置详情/

2. 直接安装 `yum install -y mongodb-org`
   1. mongodb 和 mongodb-org ?
   2. rpm 

## 启动
1. `systemctl start mongod` 启动
2. `systemctl enable mongod` 设置开机启动
3. 额外命令 restart/stop/is-active/is-enabled and so on ~

## 配置
0. 概念 database => collection => row,  理解并区分与关系型数据库的概念
1. 默认mongodb不开启密码验证, 需要自己添加
2. bindIp 限制允许访问ip
3. whereis mongod 查看相关目录，比如配置文件所在
4. 添加用户，需要在验证未开启时
5. 首先添加 默认库 admin 库的用户，role root，然后添加对应库的用户（一个库（collection）对应配置一个用户，登陆如此）
6. 添加完用户后，配置开启验证，重启服务
7. 登陆方式
   1. 直接登录：mongo --authentificationDatabase admin -u user -p password
   2. 后验证：mongo => use admin => db.auth("username", "password")
8. systemctl start mongod，启动错误，可能是不正常退出导致，删除 /tmp/mongodb-[port].sock，重启即可。其他问题查看log，配置文件记录了log位置
9. `mongod` 和 `mongo`
   1. mongod 是操作mongodb进程的命令
   2. mongo 是mongodb内部数据操作命令

暂时先到这里~
