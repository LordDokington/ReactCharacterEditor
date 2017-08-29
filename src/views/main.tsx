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

  loadFile = (file: File, afterLoading: (e: Event) => void) => {
		if (!file) { return; }

		let reader = new FileReader();
		// add function that happens after loading
		reader.onload = afterLoading;

		// actually read the text)
		reader.readAsText(file);
  }
  
  updateStateWithFileContents = (loadedFile) => {

    let alertFail = (error) => alert("file loading failed\n\n" + error);
    let alertSuccess = () => alert("loading successful");

    let loadedState = null;

    try {
      let contents = (loadedFile.target as any).result;  
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
        <label 
          htmlFor="file-select"
          className="button button-primary load-button"
        >
          load
        </label>
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
              this.loadFile(e.target.files[0], this.updateStateWithFileContents) } 
            } 
        />
        <a 
          className="button button-primary save-button"
					download={"character_editor_save_" + new Date().toLocaleString() + ".json"} 
          href={ "data:application/octet-stream;charset=utf-16le;base64," + 
                window.btoa( JSON.stringify(this.state, null, 2) ) }
        >save</a>
      </div>
    </div>
    )
  }
}