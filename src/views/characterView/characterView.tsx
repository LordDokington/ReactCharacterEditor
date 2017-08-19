import * as React from "react";
import { Character } from "../../models/character";
import CharacterEdit from "./characterEdit"
import { CharacterSelection } from "./characterSelection"

interface CharacterViewState {
  characters: Character[];
  selectionIdx: number;
}

export default class CharacterView extends React.Component<any,CharacterViewState> {
  constructor() {
    super();

    this.state = {
      characters: [ new Character("Harry Potter", 14) ],
      selectionIdx: 0
    }
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    this.setState( { characters: characters, selectionIdx: characters.length - 1 } );
  }

  updateIndex = (idx: number) => {
    alert('update index: ' + idx)
    this.setState( { selectionIdx: idx } );
  }

  get optionValueForCurrentIndex(): string {
    const characters = this.state.characters;
    const len = characters.length;
    return (len === 0) ? "" : characters[ this.state.selectionIdx ].name;
  }

  render(): JSX.Element{
      const selectionIdx = this.state.selectionIdx;
      const characters = this.state.characters;
      const currentChar = selectionIdx === -1 ? { name: undefined, age: undefined } : characters[ selectionIdx ];

      return(
        <div>
          <div className="container" >
            <CharacterEdit
              name={currentChar.name}
              age={currentChar.age}
              isNewCharacter={true}
              handleSubmitCharacter={this.appendCharacter} />
          </div>
          <div className="container" >
            <CharacterSelection
              value={this.optionValueForCurrentIndex}
              characters={characters}
              handleSelectCharacter={this.updateIndex} />
        </div>
      </div>
      );
  }
}
