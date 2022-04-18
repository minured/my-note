enum Gender {
  MALE,
  FEMALE,
}

class Person {
  /** 静态属性 */
  static fullName = ''

  /** 成员属性 */
  age = 18

  #gender: Gender

  private occupation = ''

  constructor(name: string, age: number, gender: Gender, occupation: string) {
    Person.fullName = name
    this.age = age
    this.#gender = gender
    this.occupation = occupation
  }

  getOccupation() {
    return this.occupation
  }
}

const personA = new Person('minured', 18, Gender.MALE, 'student')

// 不可访问
// console.log(personA.#gender)

console.log(personA.getOccupation())

// 抽象类

abstract class Human {
  public name: string
  private age: number

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }

  abstract sayHi(): string
}

class Man extends Human {
  constructor(name: string, age: number) {
    super(name, age)
  }

  // 非抽象类 不会继承抽象类 Human 的 sayHi，需要自己实现
  sayHi(): string {
    return `Hi, I'm ${this.name}`
  }


}

const manA = new Man('minured', 18)


// 函数重载 定义函数签名
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

