import * as React from "react";   
import * as IconUtils from "../../utils/iconUtils";
import { Character } from "../../models/character";
import { Place } from "../../models/place";

export interface PlacesViewProps {
  characters: Character[];
  places: Place[];
  //appendPlace: (place: Place) => void;
  //updatePlace: (index: number) => (place: Place) => void;
  //deletePlace: (index: number) => void;
}

interface PlacesViewState {
  invalidated: boolean,
  isNewPlace: boolean
}

export default class PlacesView extends React.Component<PlacesViewProps, PlacesViewState> {
  constructor(props) {
    super(props);

    this.state = {
      invalidated: false,
      isNewPlace: false
    }
  }

  render(): JSX.Element{
      return (
        <div className="container" >
          <img className="place-image" src="landscape-sketch.jpg" alt="character image"/>
          <div className="row">
            <div className="six columns">
              <label htmlFor="place-name">name</label>
              <input 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {} }
                className="u-full-width" type="text" placeholder="name" id="place-description" value={""} />
            </div>
            <div className="six columns">
            </div>
          </div>
          <label htmlFor="place-description">description</label>
          <textarea type="text" placeholder="..." id="place-description" className="form-textarea" rows={10}></textarea>
          <label htmlFor="character-list">present characters</label>
          <div id="character-list">
            <ul>
            {this.props.characters.map( (char: Character, idx: number) => <li key={"char_" + idx}>{char.name}</li> ) }
            </ul>
          </div>
      
          { this.state.invalidated && (
            <button 
              onClick={() => {}}
              className="button-primary">
              {this.state.isNewPlace ? "add" : "update"}
              {IconUtils.buttonIcon("fa-check")}
            </button>) }
  
          { this.state.invalidated && (
            <button 
              onClick={() => {}}
              className="button-primary">
              discard
              {IconUtils.buttonIcon("fa-times")}
            </button>) }
        </div>
      );
    }
}