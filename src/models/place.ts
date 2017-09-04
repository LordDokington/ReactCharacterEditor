import { GUID } from "../utils/guidUtils"
import { Character } from "./character"

export class Place {
  constructor(name: string, description: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.characters = [];
  }

  addCharacter(char: Character) {
    this.characters.push(char.id);
  }

  id: string;
  name: string;
  description: string;

  // contains character GUIDs
  characters: string[];
}