import { GUID } from "../utils/guidUtils";
import { Character, StoryEvent } from ".";

export default class Place {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;
    this.eventIds = [];
  }

  addEvent(event: StoryEvent) {
    this.eventIds.push(event.id);
  }

  removeEvent(event: StoryEvent) {
    this.eventIds = this.eventIds.filter( id => id !== event.id );
  }

  id: string;
  name: string;
  description: string;
  //thumbnail as data string
  thumbnail: string;

  // contains GUIDs
  eventIds: string[];
}