import { GUID } from "../utils/guidUtils"
import { Character } from "./character"

export class Place {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;
    this.characters = [];
  }

  addCharacter(char: Character) {
    this.characters.push(char.id);
  }

  id: string;
  name: string;
  description: string;
  //thumbnail as data string
  thumbnail: string;

  // contains character GUIDs
  characters: string[];
}