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
  isNewCharacter: boolean;
}

export default class CharacterView extends React.Component<CharacterViewProps, CharacterViewState> {
  constructor() {
    super();

    this.state = {
      selectionIdx: -1,
      isNewCharacter: true
    }
  }

  componentWillReceiveProps(nextProps: CharacterViewProps) {
    const thisCharactersCount = this.props.characters.length;
    const nextCharactersCount = nextProps.characters.length;
    const selectionIdx = this.state.selectionIdx;
    // if new character list is longer than the previous one, then characters were added. set index to last new one (last in list)
    if(nextCharactersCount > thisCharactersCount) {
      this.setState( {selectionIdx: nextCharactersCount-1} );
    } 
    // if new character list is shorter than the previous one, fix selectionIdx to avoid out of bounds error
    else if(nextCharactersCount-1 < selectionIdx) {
      this.setState( {selectionIdx: nextCharactersCount-1} );
    }
  }

  updateIndex = (idx: number) => {
    this.setState( { selectionIdx: idx, isNewCharacter: false } );
  }

  newCharMode = () => {
    this.setState( { isNewCharacter: true } );
  }

  get optionValueForCurrentIndex(): string {
    const characters = this.props.characters;
    const len = characters.length;
    const idx = this.state.selectionIdx;
    return (len === 0 || idx == -1) ? "" : characters[ this.state.selectionIdx ].name;
  }

  toLocalStorage = (state: CharacterViewState) => {
    localStorage.setItem( "characterView", JSON.stringify( state ) )
  }

  fromLocalStorage = (): CharacterViewState => {
    const levelsJson = localStorage.getItem( "characterView" );
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }

  componentDidMount() {
    let storedState = this.fromLocalStorage();
    if( storedState )
      this.setState( storedState )
  }

  handleSubmitCharacter = (character: Character) => {
    if (this.state.isNewCharacter) {
      this.props.appendCharacter(character)
      const newState = {
        selectionIdx: this.props.characters.length,
        isNewCharacter: false
      }
      this.setState( newState )
      this.toLocalStorage( newState )
    } else {
      this.props.updateCharacter(this.state.selectionIdx)(character)
    }
  }

  handleDeleteCharacter = () => {
    this.props.deleteCharacter(this.state.selectionIdx);
    let selectionIdx = this.state.selectionIdx;
    // decrement index if it points to last element because array is now shorter by one element
    if(selectionIdx == this.props.characters.length-1) {
      --selectionIdx;
      this.setState( {selectionIdx: selectionIdx, isNewCharacter: false} )
    }
  }

  render(): JSX.Element{
      const selectionIdx = this.state.selectionIdx;
      const characters = this.props.characters;
      const isNewCharacter = this.state.isNewCharacter;
      
      const useEmptyCharacter: boolean = selectionIdx == -1 || isNewCharacter;

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
              handleSubmitCharacter={this.handleSubmitCharacter} />
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
              >new {IconUtils.buttonIcon("fa-plus")}
              </button>

              { this.props.characters.length > 0 && (<button 
                className="button-primary button-left-margin"
                onClick={this.handleDeleteCharacter}
                >delete {IconUtils.buttonIcon("fa-trash")}
                </button>) }
            </div>
        </div>
      </div>
      );
  }
}
