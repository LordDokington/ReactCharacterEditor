import { GUID } from "../utils/guidUtils"

export class Character {
  constructor(name: string, age: number) {
    this.id = GUID();
    this.name = name;
    this.age = age;
  }

  id: string;
  name: string;
  age: number;
}