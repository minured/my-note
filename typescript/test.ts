/** 泛型 */
function add<Type>(a: Type, b: Type): Type {
  return a
}

add(1, 2);

// keyof
interface Person {
  age: number
  name: string
}

type PersonKeys = keyof Person // 'age' | 'name'
type personValue = Person[PersonKeys] // number | string

const personKeyValueA: personValue = 123132
const personKeyValueB: personValue = '12313'

function identity1<T extends Person>(a: T): T {
  return a
}

enum Gender {
  Male,
  Female,
}

interface Man extends Person {
  gender: Gender.Male
}

function identity2<T extends Man>(a: T): T {
  return a
}

// 取出并构造新类型
interface TextElement {
  left: number
  top: number
}
interface ImageElement {
  src: string
}

type ElementCombine = TextElement & ImageElement;

type NewElementA = { [K in keyof ElementCombine]: ElementCombine[K] }

const newElementAValue: NewElementA = {
  top: 1,
  left: 2,
  src: "image src"
}

console.log(newElementAValue.src)
