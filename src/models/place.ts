import { GUID } from "../utils/guidUtils"
import { Event } from "./event"
import { Character } from "./character"

export class Place {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;
    this.events = [];
  }

  addEvent(event: Event) {
    this.events.push(event.id);
  }

  removeEvent(event: Event) {
    this.events = this.events.filter( id => id != event.id );
  }

  allCharacters(): string[] {
    //const charactersForEvents = this.events.map( (e: string) => e.characters );
    //return [].concat( ...charactersForEvents ).TODO:ToActualChatacters;
    return [];
  }

  id: string;
  name: string;
  description: string;
  //thumbnail as data string
  thumbnail: string;

  // contains GUIDs
  events: string[];
}