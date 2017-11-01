import { GUID } from "../utils/guidUtils";

export type Gender = 'male' | 'female' | 'transgender' | 'agender' | 'other';

export default class Character {
  constructor(name: string, description: string, age: number, thumbnail: string, gender: Gender) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
    this.age = age;
    this.gender = gender;

    // TODO: remove
    this.kind = 'Character';
  }

  id: string;
  name: string;
  description: string;
  age: number;
  thumbnail: string;
  gender: Gender;

  readonly kind: string = 'Character';
}