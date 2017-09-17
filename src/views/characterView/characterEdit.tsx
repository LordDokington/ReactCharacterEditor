import * as React from "react";
import * as IconUtils from "../../utils/iconUtils";
import { Character } from "../../models/character";
import * as FileUtils from "../../utils/fileUtils";
import Dropzone from 'react-dropzone';

interface CharacterEditProps {
  name?: string;
  age?: number;
  isNew?: boolean;
  thumbnail: string;
  handleSubmitCharacter: (char: Character) => void;
  handleAbort: () => void;
}

interface CharacterEditState {
  name: string;
  age: string;
  thumbnail: string;
  invalidated: boolean;
}

export default class CharacterEdit extends React.Component<CharacterEditProps, CharacterEditState> {
  constructor(props: CharacterEditProps) {
    super(props);

    this.state = {
      name: props.name ? props.name : "",
      age: props.age ? props.age.toString() : "",
      thumbnail: "",
      invalidated: false
    }
  }

  componentWillReceiveProps(nextProps: CharacterEditProps) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : "",
      age: nextProps.age ? nextProps.age.toString() : "",
      thumbnail: nextProps.thumbnail,
      invalidated: false
    } );
  }

  updateName = (name: string): void => { this.setState( { name: name, invalidated: true }) }
  updateAge = (age: string): void => { this.setState( { age: age, invalidated: true } ) }

  submitCharacter = (): void => {
    const newChar = new Character(this.state.name, Number(this.state.age), this.state.thumbnail );
    //alert( "submit character " + JSON.stringify(newChar) );

    this.props.handleSubmitCharacter( newChar );
  }

  onDrop = (files: File[]) => {
    FileUtils.loadFileAsData(files[0], (event) => {
      this.setState({
        thumbnail: (event.target as any).result,
        invalidated: true
      });
    });
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} 
          className="character-image"
          activeClassName="place-image-dragged"
        >
          <img  
          src={this.state.thumbnail ? this.state.thumbnail : "placeholder.png"}
          alt={"thumbnail source: " + this.state.thumbnail} />
        </Dropzone>
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

        { (this.state.invalidated || this.props.isNew) && (
          <button 
            onClick={this.props.handleAbort}
            className="button-primary button-left-margin">
            discard
            {IconUtils.buttonIcon("fa-times")}
          </button>) }
      </div>
    );
  }
}
