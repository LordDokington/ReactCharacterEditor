import { GUID } from "../utils/guidUtils";
import { Place } from ".";

/*
  setPlace = (place: Place) => {
    this.placeId = place.id;
  }

  addCharacter = (char: Character) => {
    this.characterIds.push( char.id );
  }

  removeCharacter = (char: Character) => {
    this.characterIds = this.characterIds.filter( id => id !== char.id );
  }
*/

export default class StoryEvent {
  constructor(name: string, description: string, place: Place, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;

    this.placeId = place.id;
    this.characterIds = [];
  }

  id: string;
  name: string;
  description: string;
  thumbnail: string;

  // contains UUIDs as references
  placeId: string;
  characterIds: string[];
}