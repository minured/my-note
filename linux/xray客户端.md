# macOS安装xray客户端，配置开机自启
   0. 全程参考 https://xtls.github.io/document/level-0/ch08-xray-clients.html#_8-1-xray-%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E7%AE%80%E8%BF%B0
   1. xray成功运行后，打开 “自动操作” 应用，选取 “应用程序”
   2. 利用搜索，把 “运行AppleScript” 拖到右边
   3. 编辑命令 `do shell script "sudo whatevercommandyouwanttorun" with administrator privileges`
   4. 保存到应用程序中
   5. 将应用添加到登录项：设置-用户与群组-登录项- +添加刚才的应用

