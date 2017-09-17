import { GUID } from "../utils/guidUtils"

export class Event {
  constructor(name: string, thumbnail: string) {
    this.id = GUID();
    this.name = name;
    this.thumbnail = thumbnail;
  }

  id: string;
  name: string;
  thumbnail: string;

  // contain UUIDs as references
  place: string;
  characters: string[];
}