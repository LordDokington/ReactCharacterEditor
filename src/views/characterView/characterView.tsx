import * as React from "react";
import * as IconUtils from "../../utils/iconUtils";
import { Character } from "../../models/character";
import CharacterEdit from "./characterEdit"
import { CharacterSelection } from "./characterSelection"

interface CharacterViewState {
  characters: Character[];
  selectionIdx: number;
  isNewCharacter: boolean;
}

export default class CharacterView extends React.Component<any,CharacterViewState> {
  constructor() {
    super();

    this.state = {
      characters: [ new Character("Harry Potter", 14) ],
      selectionIdx: 0,
      isNewCharacter: false
    }
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    // set new character as the selected one
    // deactivate character adding mode after adding
    this.setState( { 
      characters: characters, 
      selectionIdx: characters.length - 1,
      isNewCharacter: false } );
  }

  updateCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters[this.state.selectionIdx] = char;

    this.setState( { characters: characters, isNewCharacter: false } );
  }

  updateIndex = (idx: number) => {
    this.setState( { selectionIdx: idx } );
  }

  newCharMode = () => {
    this.setState( { isNewCharacter: true } );
  }

  get optionValueForCurrentIndex(): string {
    const characters = this.state.characters;
    const len = characters.length;
    return (len === 0) ? "" : characters[ this.state.selectionIdx ].name;
  }

  render(): JSX.Element{
      const selectionIdx = this.state.selectionIdx;
      const characters = this.state.characters;
      const isNewCharacter = this.state.isNewCharacter;
      
      const useEmptyCharacter: boolean = selectionIdx === -1 || isNewCharacter;
      const currentChar = useEmptyCharacter ?
        { name: undefined, age: undefined } : 
        characters[ selectionIdx ];

      return(
        <div>
          <div className="container" >
            <CharacterEdit
              name={currentChar.name}
              age={currentChar.age}
              isNewCharacter={this.state.isNewCharacter}
              handleSubmitCharacter={
                this.state.isNewCharacter ?
                  this.appendCharacter :
                  this.updateCharacter
                } />
          </div>
          <div className="container" >
            <div className="selection-group">
              <CharacterSelection
                value={this.optionValueForCurrentIndex}
                characters={characters}
                handleSelectCharacter={this.updateIndex} />
              <button 
                className="button-primary"
                onClick={this.newCharMode}
              >
                new
                {IconUtils.buttonIcon("fa-plus")}
                </button>
            </div>
        </div>
      </div>
      );
  }
}
