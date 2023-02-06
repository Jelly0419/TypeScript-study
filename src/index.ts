abstract class Person {
  _name: string;
  _age?: number;
  constructor(obj: { name: string; age?: number }) {
    this._name = obj.name;
    this._age = obj.age;
  }

  abstract fly(): void;
}

class Dog extends Person {
  _weight?: number;
  constructor(obj: { name: string; age?: number; weight?: number }) {
    super(obj);
    this._weight = obj.weight;
  }
  eat() {
    console.log('吃屎');
  }
  fly(): void {
    console.log('起飞');
  }
}

const lw = new Dog({
  name: '刘威',
  weight: 160,
});
lw.eat();
interface MyCat {
  _name: string;
  _age?: number;
  height?: number;
}

class Cat extends Person implements MyCat {
  height?: number;
  constructor(obj: { name: string; age?: number; height?: number }) {
    super(obj);
    this.height = obj.height;
  }
  fly(): void {
    console.log('起飞');
  }
}

function fn<T extends Cat>(a: T): number | undefined {
  return a.height;
}

const niz = new Cat({name:'妮子',height:23})
console.log(fn(niz));

