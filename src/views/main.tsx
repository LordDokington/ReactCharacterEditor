import * as React from "react";
import * as ReactDOM from "react-dom";

import { Character } from "../models/character";
import { Place } from "../models/place";

import CharacterView from './characterView/characterView';
import TimelineView from './timelineView/timelineView';
import EventsView from './eventsView/eventsView';
import PlacesView from './placesView/placesView';
import * as FileUtils from "../utils/fileUtils";
import * as IconUtils from "../utils/iconUtils";

const views = {
  Characters: 0,
  Places: 1,
  Events: 2,
  Timeline: 3
};

interface EditorState {
  view: number;

  characters: Character[];
  places: Place[];
}

export default class EditorMain extends React.Component<{}, EditorState> {
  constructor() {
    super();

    const storedState = this.fromLocalStorage();
    if( storedState )
      this.state = storedState;
    else
      this.state = {
        view: views.Characters,
        characters: [],
        places: []
      }
  }

  getView = (view: number): JSX.Element =>
  {
    switch(view)
    {
      case views.Characters: 
        return  <CharacterView 
                  characters={this.state.characters.slice()} 
                  appendCharacter={this.appendCharacter}
                  updateCharacter={this.updateCharacter}
                  deleteCharacter={this.deleteCharacter}
                />;
      case views.Places: 
        return <PlacesView 
                 characters={this.state.characters.slice()} 
                 places={this.state.places.slice()}
                 appendPlace={this.appendPlace}
                 updatePlace={this.updatePlace}
                 deletePlace={this.deletePlace}
               /> ;
      case views.Events: return <EventsView /> ;
      case views.Timeline: return <TimelineView /> ;
  
      default: return <h3>CURRENT VIEW STATE UNDEFINED</h3>;
    }
  }

  toLocalStorage = () => {
    localStorage.setItem( "state", JSON.stringify( this.state ) )
  }

  fromLocalStorage = (): EditorState => {
    const levelsJson = localStorage.getItem( "state" );
    //alert( "loading state:\n" + levelsJson )
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }

  updateView = (view: number) => {
    this.setState( { view: view }, this.toLocalStorage )
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    this.setState( {  characters: characters }, this.toLocalStorage );
  }

  updateCharacter = (index: number) => (char: Character) : void => {
    let characters = this.state.characters.slice();
    characters[index] = char;

    this.setState( { characters: characters }, this.toLocalStorage );
  }

  deleteCharacter = (index: number) => {
    let newCharacters = this.state.characters.slice();
    newCharacters.splice(index, 1);

    this.setState( { characters: newCharacters }, this.toLocalStorage );
  }

  appendPlace = (place: Place): void => {
    let places = this.state.places.slice();
    places.push( place );

    this.setState( {  places: places }, this.toLocalStorage );
  }

  updatePlace = (index: number) => (place: Place) : void => {
    let places = this.state.places.slice();
    places[index] = place;

    this.setState( { places: places }, this.toLocalStorage );
  }

  deletePlace = (index: number) => {
    let newPlaces = this.state.places.slice();
    newPlaces.splice(index, 1);

    this.setState( { places: newPlaces }, this.toLocalStorage );
  }

  updateStateWithFileContents = (event) => {

    let alertFail = (error) => alert("file loading failed\n\n" + error);
    let alertSuccess = () => alert("loading successful");

    let loadedState = null;

    try {
      let contents = event.target.result;  
      loadedState = JSON.parse(contents);
    } catch(error) {
      alertFail(error);
    }
   
    if( loadedState ) {
      this.setState( loadedState );
      alertSuccess();
    }
  }

  formattedState = (): string => {
    return JSON.stringify(this.state, null, 2)
  }

  render() {
    console.log("render main");

    return (
    <div id="main">
      <div id="nav-bar">
        <ul>
          { Object.keys(views).map( (key) => (
              <li
                key={"nav_" + views[key]}
                onClick={() => this.updateView(views[key])}
                className={ this.state.view == views[key] ? "active-item" : ""}
              >{key}</li> ) ) }
        </ul>
      </div>
      { this.getView(this.state.view) }

      <div id="footer">
        <a 
            className="button button-primary save-button"
            download={"character_editor_save_" + new Date().toLocaleString() + ".json"} 
            href={ "data:application/octet-stream;charset=utf-16le;base64," + 
                  window.btoa( this.formattedState() ) }
        >download {IconUtils.buttonIcon("fa-download")}</a>
        <label 
          htmlFor="file-select"
          className="button button-primary load-button button-left-margin"
        >import {IconUtils.buttonIcon("fa-file")}</label>
        <input 
          type="file" className="file-input" id="file-select" name="file-select"
          ref={ 
						// this deletes the file reference stored in the input directly after loading
						// if this is not done, the same file cannot be reloaded, which is quite annoying
						(input) => { if(input) input.value = ""; }
					}
					onChange={ 
            (e: React.ChangeEvent<HTMLInputElement>) => 
            { 
              if( e.target && e.target.files )
              FileUtils.loadFileAsText(e.target.files[0], this.updateStateWithFileContents) } 
            } 
        />
      </div>
    </div>
    )
  }
}
