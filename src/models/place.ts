import { GUID } from "../utils/guidUtils"
import { Character, StoryEvent } from "."

export default class Place {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;
    this.events = [];
  }

  addEvent(event: StoryEvent) {
    this.events.push(event.id);
  }

  removeEvent(event: StoryEvent) {
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