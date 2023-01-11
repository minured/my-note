<!-- @format -->

### GFW 一般手段

1. dns 污染
2. tcp 重置攻击,篡改服务返回结果
3. 猜想 是否可以自己定义一种协议,只有自己使用,不容易被 gfw 识别
4. gfw 处理能被动接受加密数据外,还能对翻墙机发起 主动探测
   1. 通过一些手段来检查机器是否运行了 ss 服务
   2. 重放攻击,gfw 会拿我们的数据包再发送给代理机, 为了了解机器上运行了什么服务
5. 不良林: 当前主流的`ss + plugin`, `ssr`, `vmess + tls + ws`, `vless + xtls` 最终都是将流量伪装成 https 才能最稳定绕过 gfw, 因为自己研究的加密算法或者通讯机制,总是会在时间推移下曝出漏洞

### 网络结构

1. 应用层 http,处理具体数据包
2. 传输层 tcp/udp,添加端口
3. 网络层 添加 ip
4. 数据链路层 处理物理地址 mac
5. 物理层 物理连接
6. 本地路由器会做端口和 ip 的映射,nat
7. 路由器是三层设置,可以处理应用层一下的数据
8. 交换机则尽可以处理,物理层和数据链路层的数据

### 代理手段

1. vpn openvpn 具有明显的流量特征
2. shadowsocks,既可以加密又有不明显的流量特征

### shadowsocks

1. 测试,裸奔的 ss 协议已经可以被 gfw 识别,它通过重放数据包识别了 ss 服务,代理机上日志输出来自 gfw 的请求,并认证失败
   1. 也有人用同样协议没有被识别到,推测是 gfw 重点关注了某些 ip 段来探测
   2. 在特殊时期梯子可能会挂掉,因为 gfw 扩大了探测的范围
2. ss 协议引入了 plugin 功能(主要流量伪装)
   1. 通过插件吧数据伪装成普通的 http 或 websocket 的流量,欺骗 gfw
   2. ssr 节点就是类似 加了插件的 ss 节点
   3. ssr 有混淆参数和协议参数,其中混淆参数是 ss 的插件可以实现的功能
   4. ssr 独有的协议参数,主要是用来做用户认证的
   5. ssr 已不再更新了,现在有更好的替代选择
3. 历史 ss => ssr => 各家维护不同版本,如 ssrr
4. 相关连接
   1. https://github.com/shadowsocks/shadowsocks
   2. https://shadowsockshelp.github.io/Shadowsocks/Shadowsocks-wiki.html

### trojan 天生将数据伪装成 https 流量的协议

0. 总的来说是利用 https 协议,并添加 trojan 协议头
1. trojan 需要设置一个身份认证密码
2. trojan 往数据包添加一个协议头
3. 当请求密码不正确或者遇到非 trojan 协议请求, 则返回正常网站,防止 GFW 主动探测
4. trojan 进行了两次 tls 加密,会影响效率
   1. 第一层是 https 本身的 tls 加密
   2. 第二层是 trojan 使用 tls 加密伪装
   3. 同样 vmess + tls + ws 也是使用了两次 tls
   4. xray 的 xtls 则仅使用了一次 tls
5. trojan 可以方便的设置回落网页,防止主动探测
6. 相关连接
   1. https://github.com/trojan-gfw/trojan/tree/dev
   2. GO 版本 https://github.com/p4gefau1t/trojan-go/tree/master

### vmess

0. v2ray 自创 vmess 协议, 比 trojan 出现时间更早
1. vmess 利用用户 id+时间戳计算出一个 hash 值,进行数据包合法校验,所以需要跟服务器时间一样(一段范围内)
   1. 计算时加上额外 id 是为了 hash 一样时,进行区分
   2. 这种通讯方式可以被 gfw 精准探测到,已淘汰,
   3. 它可以跟 ss 一样传输的内容都是无规则字节流,无 AEAD 加密,时间戳部分在一段时间范围内可以重复使用,会被 gfw 重放攻击
2. 新版 vmess 使用 AEAD 加密,一般称为 vmessAEAD
   1. AEAD https://zhuanlan.zhihu.com/p/28566058
   2. 加上 AEAD 加密后,v2ray 就可以知道数据包被修改
   3. 旧版 md5 加密与新版 AEAD 方式不兼容,新版 vmessAEAD 默认额外 id 为 0,默认使用 AEAD
      1. 2022.1.1 彻底淘汰了旧版 md5 认证
3. 主流的 vmess 方式: `vmess + tcp/ws + tls + nginx(web)`
   1. nginx 处理前台流量,防止主动探测,理论上nginx处理前台流量会比较安全, trojan伪装网站是由trojan处理前台流量(当然也可以前面加一层nginx)
   2. nginx 通过路径(location),来把 vmess 流量转发给 v2ray 服务

### 协议常识

1. tls(传输层安全协议),ssl(安全套接层)是 tls 的前身. 1994 年网景推出首版 https,以 ssl 进行加密,这是 ssl 的起源
2. 当前 tls1.3(2018),数据传输广泛使用,成为互联网保密通讯的工业标准
3. 简单理解 https = http + tls
4. tls 协议
   1. 网站证书
   2. CA 机构 申请证书
   3. 公钥 私钥,非对称加密
5. 进行 https 访问的时候,会先跟目标服务器建立 tls 连接,目标服务器会把网站证书发给你(包含公钥)
6. 本机浏览器对证书进行校验(颁发机构,颁发的目标网站,有效期等)
7. 从 tls 回包中拿到密钥,对即将发送数据进行加密
   1. 这里浏览器并不是直接拿服务器的公钥进行非对称加密
   2. 而是与服务器协商(扩展)之后,拿到一个对称加密的密钥进行加密
   3. 总之,不是所有数据都进行非对称加密,大大减少加解密的时间
8. 目标服务器的域名信息, sni 在 tls1.2 中不加密, 在 tls1.3 中加密,叫做 esni

### 常用命令

1. `dpkg -L [nginx]`,查看包在哪些目录下创建了什么文件
2. linux 环境变量 /usr/local/bin/xxx
3.
