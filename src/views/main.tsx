import * as React from "react";
import * as ReactDOM from "react-dom";

import CharacterView from './characterView/characterView';
import TimelineView from './timelineView/timelineView';
import EventsView from './eventsView/eventsView';
import PlacesView from './placesView/placesView';
import { Character } from "../models/character";

const views = {
  Characters: 0,
  Places: 1,
  Events: 2,
  Timeline: 3
};

interface EditorState {
  view: number;

  characters: Character[];
}

export default class EditorMain extends React.Component<{}, EditorState> {
  constructor() {
    super();

    this.state = {
      view: views.Characters,

      characters: []
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
                />;
      case views.Places: return <PlacesView /> ;
      case views.Events: return <EventsView /> ;
      case views.Timeline: return <TimelineView /> ;
  
      default: return <PlacesView />;
    }
  }

  toLocalStorage = (state: EditorState) => {
    localStorage.setItem( "state", JSON.stringify( state ) )
  }

  fromLocalStorage = (): EditorState => {
    const levelsJson = localStorage.getItem( "state" );
    //alert( "loading state:\n" + levelsJson )
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }

  componentDidMount() {
    let storedState = this.fromLocalStorage();
    if( storedState )
      this.setState( storedState )
  }

  updateView = (view: number) => {
    let newState = {
      characters: this.state.characters,
      view: view
    };
    this.setState( newState )
    this.toLocalStorage( newState )
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    const newState = { 
      view: this.state.view,
      characters: characters,
    };

    this.toLocalStorage( newState );
    // set new character as the selected one
    // deactivate character adding mode after adding
    this.setState( newState );
  }

  updateCharacter = (index: number) => (char: Character) : void => {
    let characters = this.state.characters.slice();
    characters[index] = char;

    const newState = {
      view: this.state.view,
      characters: characters
    };
    this.toLocalStorage( newState );
    this.setState( { characters: characters } );
  }

  formattedState = (): string => {
    return JSON.stringify(this.state, null, 2)
  }

  restoreState = (state) => {
    this.setState( state )
  }

  render() {
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
        <input type="file" className="load-button" />
        <a className="save-button"
					download={"character_editor_save_" + new Date().toLocaleString() + ".json"} 
          href={ "data:application/octet-stream;charset=utf-16le;base64," + 
                window.btoa( JSON.stringify(this.state, null, 2) ) }
        >save</a>
      </div>
    </div>
    )
  }
}