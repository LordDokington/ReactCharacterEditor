import { GUID } from "../utils/guidUtils";
import { Place, Character } from ".";

export default class StoryEvent {
  constructor(name: string, description: string, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
  }

  setPlace(place: Place) {
    this.placeId = place.id;
  }

  addCharacter(char: Character) {
    this.characterIds.push( char.id );
  }

  removeCharacter(char: Character) {
    this.characterIds = this.characterIds.filter( id => id !== char.id );
    
  }
  id: string;
  name: string;
  description: string;
  thumbnail: string;

  // contains UUIDs as references
  placeId: string;
  characterIds: string[];
}