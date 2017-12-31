import { GUID } from 'utils/guidUtils';
import Entity from './entity';

export type Gender = 'male' | 'female' | 'transgender' | 'agender' | 'other';

export default class Character implements Entity {
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

  name: string;
  thumbnail: string;
  description: string;

  age: number;
  gender: Gender;

  id: string;

  readonly kind: string = 'Character';
}
