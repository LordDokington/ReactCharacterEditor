import * as React from "react";
import * as IconUtils from "../../utils/iconUtils";
import { Character } from "../../models/character";
import CharacterEdit from "./characterEdit"
import { CharacterSelection } from "./characterSelection"

export interface CharacterViewProps {
  characters: Character[];
  appendCharacter: (char: Character) => void;
  updateCharacter: (index: number) => (char: Character) => void;
  deleteCharacter: (index: number) => void;
}

interface CharacterViewState {
  selectionIdx: number;
  isNew: boolean;
}

export default class CharacterView extends React.Component<CharacterViewProps, CharacterViewState> {
  constructor() {
    super();

    const storedState = this.fromLocalStorage();
    if( storedState )
      this.state = storedState;
    else
      this.state = {
        selectionIdx: -1,
        isNew: true
      }
  }

  componentWillReceiveProps(nextProps: CharacterViewProps) {
    const thisCharactersCount = this.props.characters.length;
    const nextCharactersCount = nextProps.characters.length;
    const selectionIdx = this.state.selectionIdx;
    // if new character list is longer than the previous one, then characters were added. set index to last new one (last in list)
    if(nextCharactersCount > thisCharactersCount) {
      this.setState( {selectionIdx: nextCharactersCount-1, isNew: false} );
    } 
    // if new character list is shorter than the previous one, fix selectionIdx to avoid out of bounds error
    else if(nextCharactersCount-1 < selectionIdx) {
      this.setState( {selectionIdx: nextCharactersCount-1, isNew: false} );
    }
  }

  updateIndex = (idx: number) => {
    // the 2nd argument is a function that is executed after the state is updated
    this.setState( { selectionIdx: idx, isNew: false }, this.toLocalStorage );
  }

  newCharMode = () => {
    this.setState( { isNew: true }, this.toLocalStorage );
  }

  get optionValueForCurrentIndex(): string {
    const characters = this.props.characters;
    const len = characters.length;
    const idx = this.state.selectionIdx;
    return (len === 0 || idx == -1) ? "" : characters[ idx ].name;
  }

  toLocalStorage = () => {
    localStorage.setItem( "characterView", JSON.stringify( this.state ) )
  }

  fromLocalStorage = (): CharacterViewState => {
    const levelsJson = localStorage.getItem( "characterView" );
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }

  handleSubmitCharacter = (character: Character) => {
    if (this.state.isNew) {
      this.props.appendCharacter(character)
    } else {
      this.props.updateCharacter(this.state.selectionIdx)(character)
    }
  }

  handleDeleteCharacter = () => {
    this.props.deleteCharacter(this.state.selectionIdx);
  }

  render(): JSX.Element{
      const selectionIdx = this.state.selectionIdx;
      const characters = this.props.characters;
      const isNew = this.state.isNew || characters.length === 0;
      const useEmptyCharacter: boolean = selectionIdx == -1 || isNew;

      const currentChar = useEmptyCharacter ?
        { name: undefined, age: undefined } : 
        characters[ selectionIdx ];

      return(
        <div>
          <div className="container" >
            <CharacterEdit
              name={currentChar.name}
              age={currentChar.age}
              isNew={isNew}
              handleSubmitCharacter={this.handleSubmitCharacter} />
          </div>
          <div className="container" >
            <CharacterSelection
              value={this.optionValueForCurrentIndex}
              characters={characters}
              handleSelectCharacter={this.updateIndex} />
            <button 
              className="button button-primary"
              onClick={this.newCharMode}
            >new {IconUtils.buttonIcon("fa-plus")}
            </button>

            { this.props.characters.length > 0 && (<button 
              className="button button-primary button-left-margin"
              onClick={this.handleDeleteCharacter}
              >delete {IconUtils.buttonIcon("fa-trash")}
              </button>) }
        </div>
      </div>
      );
  }
}
