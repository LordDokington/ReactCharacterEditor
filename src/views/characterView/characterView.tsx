import * as React from "react";
import { Character } from "../../models/character";
import CharacterEdit from "./characterEdit"

interface CharacterViewState {
  characters: string[];
}

export default class CharacterView extends React.Component<any,any> {
  constructor() {
    super();

    this.state = {
      characters: [ new Character("Harry Potter", 14) ]
    }
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    this.setState( { characters: characters } );
  }

  render(): JSX.Element{
      return(
        <div id="main" >
          <CharacterEdit
            isNewCharacter={true}
            handleSubmitCharacter={this.appendCharacter} />
          <select id="characters">
            { this.state.characters.map( (char, i) => <option key={"charOption_" + i} value={char.name}>{char.name}</option> ) }
          </select>
        </div>
      );
  }
}
