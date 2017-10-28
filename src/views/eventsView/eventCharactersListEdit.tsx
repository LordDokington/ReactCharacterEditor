import * as React from 'react';
import { Character, StoryEvent } from '../../models';
import { Dropdown } from '../../components';

interface Props {
    isEmptyView: boolean;
    charactersOfEvent: Character[];
    selectableCharsAdd: Character[];
    currentEvent: StoryEvent;
    handleUpdateEvent: (e: StoryEvent) => void;
}

const EventCharactersListEdit = (props: Props) => {
    const charactersOfEvent = props.charactersOfEvent;
    const isEmptyView = props.isEmptyView;
    const selectableCharsAdd = props.selectableCharsAdd;
    const currentEvent: StoryEvent = props.currentEvent;
    const handleUpdateEvent = props.handleUpdateEvent;

    return (
    <div className="container">
      <label htmlFor="character-list">present characters</label>
      <div id="character-list">
        <ul>
          { 
            isEmptyView ? null :
            charactersOfEvent.map( (char: Character, idx: number) => (
              <li key={idx}>
                {char.name} 
              </li>
            ))
          }
        </ul>
      </div>
      <div className="six columns">
        {selectableCharsAdd.length > 0 && (
        <Dropdown
          label="add character"
          index={0}
          listElements={[''].concat( selectableCharsAdd.map( char => char.name ) )}
          handleSelect={(idxPlusOne: number) => {
            if( !currentEvent ) {
              alert('empty view');
              return;
            }
            const idx = idxPlusOne - 1;
            currentEvent.characterIds.push(selectableCharsAdd[idx].id);
            handleUpdateEvent(currentEvent);
          }}
        />
        )}
      </div>
      <div className="six columns">
        {charactersOfEvent.length > 0 && (
        <Dropdown
          label="remove character"
          index={0}
          listElements={[''].concat( charactersOfEvent.map( char => char.name ) )}
          handleSelect={(idxPlusOne: number) => {
            if( !currentEvent ) {
              alert('empty view');
              return;
            }
            const idx = idxPlusOne - 1;
            currentEvent.characterIds = currentEvent.characterIds.filter( id => id !== charactersOfEvent[idx].id);
            handleUpdateEvent(currentEvent);
          }}
        />
        )}
      </div>
    </div>
    );
};

export default EventCharactersListEdit;