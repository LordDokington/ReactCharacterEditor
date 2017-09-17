import { GUID } from "../utils/guidUtils"

export class Character {
  constructor(name: string, age: number, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.thumbnail = thumbnail;
    this.age = age;
  }

  id: string;
  name: string;
  age: number;
  thumbnail: string;
}