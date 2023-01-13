<!-- @format -->

### 语言分类-编译上

1. 编译型语言, 先由 compiler 编译为机器码, 如 C,CPP,GO
2. 解析型语言, 需要运行在解析器中, 如 javascript,ruby
3. 混合型, java, python

### JS 的运行时

1. js 的运行依赖一个独立程序, 由两部分组成`engine`和`runtime`
   1. engine 负责读取 js 代码,转换为可执行的机器语言
   2. runtime 为 js 提供一些对象,使他可以与外界交互
   3. 开发人员一般与 runtime 提供的接口交互,不触及 engine
2. 常见 js 的 runtime 及其 engine
   1. chrome, 新 edge, nodejs, deno => V8
      1. chrome 提供 window 对象
      2. node 提供了 fs, buffer 等
   2. firefox => spidermonkey
   3. safari, bun => javascriptCore
