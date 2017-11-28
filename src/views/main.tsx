import * as React from 'react';

import { Character, Place, StoryEvent, Storage } from '../models';
import CharacterView from './characterView/characterView';
import TimelineView from './timelineView/timelineView';
import EventsView from './eventsView/eventsView';
import PlacesView from './placesView/placesView';
import * as FileUtils from '../utils/fileUtils';
import * as IconUtils from '../utils/iconUtils';

import '../styles/main.less';

const views = {
  Characters: 0,
  Places: 1,
  Events: 2,
  Timeline: 3
};

type StoryEntity = Character | Place | StoryEvent;

interface EditorState {
  view: number;

  characters: Character[];
  places: Place[];
  events: StoryEvent[];

  characterIdx: number;
  placeIdx: number;
  eventIdx: number;
}

export default class EditorMain extends React.Component<{}, EditorState> {
  constructor() {
    super();

    //localStorage.clear();

    const storedState = this.fromLocalStorage();
    
    this.state = storedState || {
      view: views.Characters,
      characters: [],
      places: [],
      events: [],

      characterIdx: 0,
      placeIdx: 0,
      eventIdx: 0,

      selectedEntity: undefined
    };
  }

  getView = (view: number): JSX.Element => {

    //console.log('chars: ' + this.state.characters);
    //console.log('places: ' + this.state.places);
    //console.log('events: ' + this.state.events);

    const storage: Storage = new Storage(this.state.characters, this.state.places, this.state.events);

    switch(view) {
      case views.Characters: 
        return  (
          <CharacterView 
            objects={this.state.characters.slice()} 
            append={this.appendCharacter}
            update={this.updateCharacter}
            delete={this.deleteCharacter}

            toObjectView={this.toViewOfObject}

            selectionIdx={this.state.characterIdx}
            updateSelectionIdx={idx => this.setState({ characterIdx: idx }, this.toLocalStorage)}

            placesOfCharacter={storage.PlacesOfCharacter}    
            eventsOfCharacter={storage.EventsOfCharacter}
            events={this.state.events}
          />);
      case views.Places: 
        return (
          <PlacesView 
            characters={this.state.characters.slice()} 
            objects={this.state.places.slice()}
            append={this.appendPlace}
            update={this.updatePlace}
            delete={this.deletePlace}

            toObjectView={this.toViewOfObject}

            selectionIdx={this.state.placeIdx}
            updateSelectionIdx={idx => this.setState({ placeIdx: idx }, this.toLocalStorage)}

            charactersOfPlace={storage.CharactersOfPlace}
            eventsOfPlace={storage.EventsOfPlace}
          />);
      case views.Events: 
        return (
          <EventsView
            objects={this.state.events.slice()}
            append={this.appendEvent}
            update={this.updateEvent}
            delete={this.deleteEvent}

            toObjectView={this.toViewOfObject}

            selectionIdx={this.state.eventIdx}
            updateSelectionIdx={idx => this.setState({ eventIdx: idx }, this.toLocalStorage)}

            characters={this.state.characters.slice()}
            places={this.state.places}
            charactersOfEvent={storage.CharactersOfEvent}
          />);
      case views.Timeline: return <TimelineView /> ;
  
      default: return <h3>CURRENT VIEW STATE UNDEFINED</h3>;
    }
  }

  toLocalStorage = () => {
    localStorage.setItem( "state", JSON.stringify( this.state ) );
  }

  fromLocalStorage = (): EditorState => {
    const levelsJson = localStorage.getItem( "state" );
    // alert( "loading state:\n" + levelsJson )
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }

  updateView = (view: number) => {
    this.setState( { view: view }, this.toLocalStorage );
  }

  appendCharacter = (char: Character): void => {
    let characters = this.state.characters.slice();
    characters.push( char );

    this.setState( {  characters: characters }, this.toLocalStorage );
  }

  updateCharacter = (index: number) => (char: Character): void => {
    let characters = this.state.characters.slice();
    // restore old UUID from object
    const oldId = characters[index].id;
    char.id = oldId;
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

  updatePlace = (index: number) => (place: Place): void => {
    let places = this.state.places.slice();
    // restore old UUID from object
    const oldId = places[index].id;
    place.id = oldId;
    places[index] = place;

    this.setState( { places: places }, this.toLocalStorage );
  }

  deletePlace = (index: number) => {
    let places = this.state.places.slice();
    places.splice(index, 1);

    this.setState( { places }, this.toLocalStorage );
  }

  appendEvent = (event: StoryEvent): void => {
    let events = this.state.events.slice();
    events.push( event );

    this.setState( { events }, this.toLocalStorage );
  }

  updateEvent = (index: number) => (event: StoryEvent): void => {
    let events = this.state.events.slice();
    // restore old UUID from object
    const oldId = events[index].id;
    event.id = oldId;
    events[index] = event;

    this.setState( { events }, this.toLocalStorage );
  }

  deleteEvent = (index: number) => {
    let events = this.state.events.slice();
    events.splice(index, 1);

    this.setState( { events }, this.toLocalStorage );
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

    let state = Object.assign({}, this.state);

    // TODO: remve later! this just removes all thumbnail data (which is most of the file's content) 
    // for easier reading and debugging of export
    function iterate(obj, stack) { // tslint:disable-line
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] === "object") iterate(obj[property], stack + '.' + property);
          else {
            console.log(property + "   " + obj[property]);
            if( property === 'thumbnail') obj[property] = '';
          }
        }
      }
    }
    //iterate(state, '');

    return JSON.stringify(state, null, 2);
  }

  toViewOfObject = (newEntity: StoryEntity) => {
    
    let newView, newIdx;

    switch (newEntity.kind) {
      case 'Character': 
      newView = views.Characters;
      newIdx = this.state.characters.findIndex( c => c.id === newEntity.id );
      this.setState( { view: newView, characterIdx: newIdx }, this.toLocalStorage );
      break;
      case "Place": 
      newView = views.Places;
      newIdx = this.state.places.findIndex( p => p.id === newEntity.id );
      this.setState( { view: newView, placeIdx: newIdx }, this.toLocalStorage );
      break;
      case "StoryEvent": 
      newView = views.Events;
      newIdx = this.state.events.findIndex( e => e.id === newEntity.id );
      this.setState( { view: newView, eventIdx: newIdx }, this.toLocalStorage );
      break;
      default: break;
    }
  }

  render() {
    console.log("render main");

    return (
    <div id="main">
    <div className={'color-bar ' + Object.keys(views)[this.state.view]} />
    <div id="main-content">
      <div id="nav-bar">
          { Object.keys(views).map( (key, idx) => (
              <div
                key={idx}
                onClick={() => this.updateView(views[key])}
                className={ 'tab-item ' + (this.state.view === views[key] ? ' active' : '')}
              >
                <div className={key} />
                {key}
              </div> ) ) }
      </div>
      { this.getView(this.state.view) }

      <div id="footer">
        <a 
            className="button button-primary save-button"
            download={"character_editor_save_" + new Date().toLocaleString() + ".json"} 
            href={ "data:application/octet-stream;charset=utf-16le;base64," + 
                  window.btoa( this.formattedState() ) }
        >
          download {IconUtils.buttonIcon("fa-download")}
        </a>
        <label 
          htmlFor="file-select"
          className="button button-primary load-button button-left-margin"
        >
          import {IconUtils.buttonIcon("fa-file")}
        </label>
        <input 
          type="file" 
          className="file-input" 
          id="file-select" 
          name="file-select"
          ref={ 
            // this deletes the file reference stored in the input directly after loading
            // if this is not done, the same file cannot be reloaded, which is quite annoying
            (input) => { if(input) input.value = ''; }
          }
          onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { 
              if( e.target && e.target.files ) 
                FileUtils.loadFileAsText(e.target.files[0], this.updateStateWithFileContents);
            }
          } 
        />
      </div>
    </div>
    </div>
    );
  }
}
