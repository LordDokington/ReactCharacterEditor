import { GUID } from "../utils/guidUtils"
import { Character } from "./character";
import { Place } from "./place";

export class Event {
  constructor(name: string, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.thumbnail = thumbnail;
  }

  setPlace(place: Place) {
    this.place = place.id;
  }

  addCharacter(char: Character) {
    this.characters.push( char.id );
  }

  removeCharacter(char: Character) {
    this.characters = this.characters.filter( id => id != char.id );
  }

  id: string;
  name: string;
  thumbnail: string;

  // contain UUIDs as references
  place: string;
  characters: string[];
}