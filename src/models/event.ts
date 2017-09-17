import { GUID } from "../utils/guidUtils"
import { Character } from "./character";
import { Place } from "./place";

export class StoryEvent {
  constructor(name: string, description: string, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
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
  description: string;
  thumbnail: string;

  // contains UUIDs as references
  place: string;
  characters: string[];
}