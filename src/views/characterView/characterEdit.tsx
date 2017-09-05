import * as React from "react";
import * as IconUtils from "../../utils/iconUtils";
import { Character } from "../../models/character";

interface CharacterEditProps {
  name?: string;
  age?: number;
  handleSubmitCharacter: (char: Character) => void;
  isNew?: boolean;
}

interface CharacterEditState {
  name: string;
  age: string;
  invalidated: boolean;
}

export default class CharacterEdit extends React.Component<CharacterEditProps, CharacterEditState> {
  constructor(props: CharacterEditProps) {
    super(props);

    this.state = {
      name: props.name ? props.name : "",
      age: props.age ? props.age.toString() : "",
      invalidated: false
    }
  }

  componentWillReceiveProps(nextProps: CharacterEditProps) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : "",
      age: nextProps.age ? nextProps.age.toString() : "",
      invalidated: false
    } );
  }

  reset = () => {
    this.setState( {
      name: this.props.name ? this.props.name : "",
      age: this.props.age ? this.props.age.toString() : "",
      invalidated: false
    } );
  }

  updateName = (name: string): void => { this.setState( { name: name, invalidated: true }) }
  updateAge = (age: string): void => { this.setState( { age: age, invalidated: true } ) }

  submitCharacter = (): void => {
    const newChar = new Character(this.state.name, Number(this.state.age) );
    //alert( "submit character " + JSON.stringify(newChar) );

    this.props.handleSubmitCharacter( newChar );
  }

  render() {
    return (
      <div>
        <img className="character-image" src="placeholder.png" alt="character image"/>
        <div className="row">
          <div className="six columns">
            <label htmlFor="character-name">name</label>
            <input 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.updateName(e.target.value) }
              className="u-full-width" type="text" placeholder="name" id="character-name" value={this.state.name} />
          </div>
          <div className="six columns">
            <label htmlFor="character-age">age</label>
            <input
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.updateAge( e.target.value ) } 
              className="u-full-width" 
              type="number" placeholder="age" id="character-age" min={0} 
              value={this.state.age} />
          </div>
        </div>
    
      	{ this.state.invalidated && (
          <button 
            onClick={this.submitCharacter}
            className="button-primary">
            {this.props.isNew ? "add" : "update"}
            {IconUtils.buttonIcon("fa-check")}
          </button>) }

        { !this.props.isNew && this.state.invalidated && (
          <button 
            onClick={this.reset}
            className="button-primary button-left-margin">
            discard
            {IconUtils.buttonIcon("fa-times")}
          </button>) }
      </div>
    );
  }
}
