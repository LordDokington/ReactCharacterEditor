import { GUID } from 'utils/guidUtils';

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
  constructor(name: string, description: string, placeId: string, thumbnail: string, characterIds: string[]) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;

    this.placeId = placeId;
    this.characterIds = characterIds;

    // TODO: remove
    this.kind = 'StoryEvent';
  }

  id: string;
  name: string;
  description: string;
  thumbnail: string;

  // contains UUIDs as references
  placeId: string;
  characterIds: string[];

  readonly kind: string = 'StoryEvent';
}
