import { GUID } from "../utils/guidUtils"

export default class Character {
  constructor(name: string, description: string, age: number, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.age = age;
  }

  id: string;
  name: string;
  description: string;
  age: number;
  thumbnail: string;
}