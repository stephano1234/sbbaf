export function func1(arg: number): string {
  return arg.toString();
}

class A {}

export class Foo extends A {
  constructor() {
    return this;
  }
}
