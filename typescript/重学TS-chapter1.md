## 枚举

### 普通枚举

```typescript
enum Gender {
  MALE,
  FEMALE
}
```

### 常量枚举

```typescript
const enum Direction {
 	EAST,
 	SOUTH,
 	WEST,
  NORTH
}
```

### 异构枚举 (值为混合类型)

```typescript
enum Enum {
  AGE = 1,
  NAME,
  GENDER = "2"
}
```

### 顶级类型 

1. `Any`，开发者的逃逸仓，允许任何操作，无需ts类型检查

2. `Unknown`

   1. 可以对`unknown`类型赋值，但`unknown`类型只能给 `unknown`和`any`

   2. 对`unknwon`进行任何方法操作都是不允许的

      ```typescript
      const unknownValue: Unknown;
      
      unknownValue.name; //Error
      unknownValue.trim(); //Error
      new unknownValue.; //Error
      
      
      

### Tuple 元组

```typescript
let tupleValue = [string, boolean]
tupleValue = ["first string type", true]
// 赋值时需要按照类型顺序
```

### Void 类型

​	与`any`相反，表示没有任何类型

### object、Object、{} 

​	对于`javascript`来说，只有`Object`类型，没有`object`类型，“object”只是 typeof 返回的字符串，但是对于 `Typescript`来说，同时存在着两种类型：

​	[参考资料，区别](https://www.jianshu.com/p/8d7cfc4b912c)

	*  `object` 是TypeScript v2.2引入的一种非基本类型，不能被赋予原始值。
	*   `Object` 是对TypeScript对`JavaScript Object.prototype`原型对象的定义，是所属对象类型的顶层类型，即所有对象类型都继承了`Object`中定义的属性/方法。同时，由于`JavaScript`的拆箱装箱机制，`Object`类型的变量可以被赋予原始值，而基本类型也可以访问`Object`中定义的属性/方法。
	*  `{}` 是一个没有任何成员的对象类型，它可以访问`Object`中定义的属性/方法，也可以被赋予原始值。 

​	因此，在约束对象类型时，我们应该始终使用`object`！

### Never 永远不存在的值

可以利用任意类型不能赋值给`never`这个特性做代码检查：

```typescript
type Foo = string | number;

function judgeNeverType(foo: Foo) {
  if (typeof foo === "string" || typeof foo === "number") {
    // do something
  } else {
    // 代码跑到这里报错，查出foo类型错误
    const check: never = foo
  }
}
```

### 断言

​	类型断言： `as` 或  `<>`

​	非空断言，确定赋值断言 `!`

### 类型守卫

1. `in`

   ```typescript
   // 类型守卫
   interface Admin {
     name: string;
     privileges:string[];
   }
   
   interface Employee {
     name: string;
     startDate: Date;
   }
   
   type UnknownEmployee = Admin | Employee;
   
   function printEmployeeInformation(emp: UnknownEmployee) {
     console.log(`Name: ${emp.name}`);
     if ('privileges' in emp) {
       console.log(`Privileges: ${emp.privileges}`);
     }
     if ('startDate' in emp) {
       console.log(`Start Date: ${emp.startDate}`);
     }
   }
   
   printEmployeeInformation({ name: 'Manu', startDate: new Date() });
   printEmployeeInformation({ name: 'Manu', privileges: ['admin'] });
   ```

   

2. `typeof`

3. `instanceof`

## TypeScript 函数

​	支持参数类型和返回值类型，可选参数，默认参数，剩余参数，函数重载


### 函数重载

概念：

函数重载 是指同一个函数，利用不同数量或类型的参数，达到多个函数功能的能力。

[函数签名](https://developer.mozilla.org/zh-CN/docs/Glossary/Signature/Function) 定义了函数的输入和输出，一个函数签名可以包括：

 * 参数和参数的类型
 * 返回值及其类型
 * 可能抛出或传回的异常
 * 有关面向对象程序方法中可用的信息（private/public/prototype）

实现：

1. 直接修改函数签名 

   ```typescript
   function getSomething(person: string | string[]): string | string[] {
   }
   ```

2. 使用函数重载（定义函数签名和重载签名）

   ```typescript
   // 定义函数签名
   function sayHi(name: string): void;
   function sayHi(name: string[]):void;
   
   // 定义函数实现
   function sayHi(name: unknown): void {
     if (typeof name === "string") {
       console.log(`hi, my name is ${name}!`)
     } else if (name instanceof Array) {
       name.forEach(i => console.log(`hi, my name is ${i}!`))
     }
   }
   
   sayHi("John")
   sayHi(["mercy", "dva", "genji", "tracer"])
   ```

   



## TypeScript 类

### 静态属性与成员属性的区别

	1. 静态属性只存在于类本身（`Person.name`），不能在实例上访问（`this.name //Error`），实例不会继承类的静态属性和方法

### 私有字段 #

```typescript
class Person {
  #name:string;
  constructor(name:string) {
    this.#name = name
  }
  getName() {
    return this.#name
  }
}
const personA = new Person("minured")

personA.#name //Error
// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.

```



私有字段 区别于 `private`修饰的属性，有以下规则：

	1. 以 `#`开头
	1. 每个私有字段名称都唯⼀地限定于其包含的类； 
	1. 不能在私有字段上使⽤ TypeScript 可访问性修饰符（如 public 或 private）； 
	1. 私有字段不能在包含的类之外访问，甚⾄不能被检测到

### getter setter 访问器

### 继承 

​	实现类的联合，可以把类当作接口使用

### 抽象类

抽象类不能被实例化，里面包含抽象方法（不包含具体实现，只有名字）

```typescript
abstract class Person {
  private name;
  constructor(name:string) {
    this.name
  }
  
  abstract getName():string;
}

class Man extends Person {
  constructor(name){
		super(name)
  }
  // 抽象方法需要自己实现
  getName():string {
    return this.name
	}
}
```

### 类方法重载 

​	同函数重载



