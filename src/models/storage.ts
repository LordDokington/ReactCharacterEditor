import { Character, Place, StoryEvent } from ".";

class Storage {
  constructor(characters: Character[], places: Place[], events: StoryEvent[]) {
    this.characters = characters;
    this.places = places;
    this.events = events;
  }

  Character = (id: string): Character | undefined => {
    return this.characters.find( c => c.id === id );
  }

  Place = (id: string): Place | undefined => {
    return this.places.find( p => p.id === id );
  }

  Event = (id: string): StoryEvent | undefined => {
    return this.events.find( e => e.id === id );
  }

  CharactersOfPlace = (place: Place): Character[] => {
    const nestedCharactersForEvents: Character[][] = this.EventsOfPlace(place).map( this.CharactersOfEvent );
    
    // flatten array
    const charactersForEvents: Character[] = [];
    charactersForEvents.concat(...nestedCharactersForEvents);

    // remove duplicates
    const withoutDuplicates = charactersForEvents.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
    return withoutDuplicates;
  }

  CharacterIdsOfPlace = (place: Place): string[] => {
    return this.CharactersOfPlace(place).map( c => c.id );
  }

  // return characters, filter out undefined ones
  CharactersOfEvent = (event: StoryEvent): Character[] => {
    return event.characterIds.map( this.Character ).filter( char => !!char ) as Character[];
  }

  PlaceOfEvent = (event: StoryEvent): Place => {
    return this.Place( event.placeId ) as Place;
  }

  PlacesOfCharacter = (char: Character): Place[] => {
    return this.places.filter( place => this.CharacterIdsOfPlace(place).includes( char.id ) );
  }

  EventsOfPlace = (place: Place): StoryEvent[] => {
    return this.events.filter( e => e.placeId === place.id ) as StoryEvent[];
  }

  EventsOfCharacter = (character: Character): StoryEvent[] => {
    return this.EventIdsOfCharacter(character)
      .map( id => this.Event(id) )
      .filter( event => !!event ) as StoryEvent[];
  }

  EventIdsOfCharacter = (character: Character): string[] => {
    const charactersForEvents: string[][] = this.events.map( (e: StoryEvent) => e.characterIds );
    
    // TODO: refactor (utils function or remove entirely)
    const flatten = arr => arr.reduce(
      (acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
      ),
      []
    );

    // use a set to remove duplicates
    const withoutDuplicates = flatten(charactersForEvents).filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    });
    return withoutDuplicates;
  }

  private characters: Character[];
  private places: Place[];
  private events: StoryEvent[];
}

export default Storage;