import * as React from "react";
import { Character } from "../../models/character";

interface CharacterEditProps {
  handleSubmitCharacter: (char: Character) => void;
  isNewCharacter: boolean
}

interface CharacterEditState {
  name: string;
  age: number;
}

export default class CharacterEdit extends React.Component<CharacterEditProps, CharacterEditState> {
  constructor(props: CharacterEditProps) {
    super(props);

    this.state = {
      name: "",
      age: 0
    }
  }

  updateName(name: string) { this.setState( { name: name }) }
  updateAge(age: number) { this.setState( { age: age }) }

  submitCharacter = (): void => {
    const newChar = new Character(this.state.name, this.state.age);
    alert( "submit character " + JSON.stringify(newChar) );

    this.props.handleSubmitCharacter( newChar );
  }

  render() {
    return (
      <div id="character-main" >
        <img className="character-image" src="placeholder.png" alt="character image"/>
        <div className="row">
          <div className="six columns">
            <label htmlFor="character-name">name</label>
            <input 
              onChange={ e => this.updateName(e.target.value) }
              className="u-full-width" type="text" placeholder="name" id="character-name" />
          </div>
          <div className="six columns">
            <label htmlFor="character-age">age</label>
            <input
            onChange={ e => this.updateAge( Number(e.target.value) ) } 
              className="u-full-width" type="number" placeholder="age" id="character-age" />
          </div>
        </div>
    
        <button 
          onClick={this.submitCharacter}
          className="button-primary">{this.props.isNewCharacter ? "add" : "update"}</button>
      </div>
    );
  }
}
