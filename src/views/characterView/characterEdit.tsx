import * as React from "react";
import { Character } from "../../models/character";

interface CharacterEditProps {
  name?: string;
  age?: number;
  handleSubmitCharacter: (char: Character) => void;
  isNewCharacter: boolean;
}

interface CharacterEditState {
  name: string;
  age: string;
}

export default class CharacterEdit extends React.Component<CharacterEditProps, CharacterEditState> {
  constructor(props: CharacterEditProps) {
    super(props);

    this.state = {
      name: props.name ? props.name : "",
      age: props.age ? props.age.toString() : ""
    }
  }

  componentWillReceiveProps(nextProps: CharacterEditProps) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : "",
      age: nextProps.age ? nextProps.age.toString() : ""
    } );
  }

  updateName(name: string) { this.setState( { name: name }) }
  updateAge(age: string) { this.setState( { age: age } ) }

  submitCharacter = (): void => {
    const newChar = new Character(this.state.name, Number(this.state.age) );
    //alert( "submit character " + JSON.stringify(newChar) );

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
              className="u-full-width" type="text" placeholder="name" id="character-name" value={this.state.name} />
          </div>
          <div className="six columns">
            <label htmlFor="character-age">age</label>
            <input
            onChange={ e => this.updateAge( e.target.value ) } 
              className="u-full-width" type="number" placeholder="age" id="character-age" value={this.state.age} />
          </div>
        </div>
    
        <button 
          onClick={this.submitCharacter}
          className="button-primary">{this.props.isNewCharacter ? "add" : "update"}</button>
      </div>
    );
  }
}
