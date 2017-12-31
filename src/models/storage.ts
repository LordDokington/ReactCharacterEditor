import { Character, Place, StoryEvent } from '.';

// remove undefined references and duplicates
const cleanup = list => list.filter((elem, pos, arr) => elem && arr.indexOf(elem) === pos);

class Storage {
  constructor(characters: Character[], places: Place[], events: StoryEvent[]) {
    this.characters = characters;
    this.places = places;
    this.events = events;
  }

  Character = (id: string): Character | undefined => {
    return this.characters.find(c => c.id === id);
  };

  Place = (id: string): Place | undefined => {
    return this.places.find(p => p.id === id);
  };

  Event = (id: string): StoryEvent | undefined => {
    return this.events.find(e => e.id === id);
  };

  CharactersOfPlace = (place: Place): Character[] => {
    const charactersForEvents: Character[] = this.EventsOfPlace(place)
      .map(this.CharactersOfEvent)
      // flatten array
      .reduce((list1, list2) => Array.prototype.concat(list1, list2), []);

    return cleanup(charactersForEvents);
  };

  CharacterIdsOfPlace = (place: Place): string[] => {
    return this.CharactersOfPlace(place).map(c => c.id) || [];
  };

  // return characters, filter out undefined ones
  CharactersOfEvent = (event: StoryEvent): Character[] => {
    return event.characterIds.map(this.Character).filter(char => !!char) as Character[];
  };

  PlaceOfEvent = (event: StoryEvent): Place => {
    return this.Place(event.placeId) as Place;
  };

  PlacesOfCharacter = (character: Character): Place[] => {
    if (!character) return [];
    const placesList = this.EventsOfCharacter(character).map(this.PlaceOfEvent) as Place[];

    return cleanup(placesList);
  };

  EventsOfPlace = (place: Place): StoryEvent[] => {
    if (!place) return [];
    return this.events.filter(e => e.placeId === place.id) as StoryEvent[];
  };

  EventsOfCharacter = (character: Character): StoryEvent[] => {
    if (!character) return [];
    return this.events.filter((e: StoryEvent) => e.characterIds.includes(character.id));
  };

  EventIdsOfCharacter = (character: Character): string[] => {
    return this.EventsOfCharacter(character).map((e: StoryEvent) => e.id);
  };

  private characters: Character[];
  private places: Place[];
  private events: StoryEvent[];
}

export default Storage;
