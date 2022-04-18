* 使用泛型来支持不同的数据类型，支持方法和组件复用
* TypeScript中的泛型类型参数比较一致，常用以下字符表示：
  * T 表示 Type，是最通用的，因此也是最常用的类型参数名
  * K 表示 Key，P 表示 Property，两者倾向于受 PropertyKey 或 keyof T 或 keyof SomeInterface 或 keyof SomeClass 约束
  * V 表示 Value，最常与 K 一起作成对使用
  * A 表示 Arguments， R 表示 Return， 分别对应函数签名的 rest 参数列表和返回类型，如 (...args: A) => R
  * N 表示 Number， S 表示 String，B 表示 boolean， 表示受原语约束的类型参数。