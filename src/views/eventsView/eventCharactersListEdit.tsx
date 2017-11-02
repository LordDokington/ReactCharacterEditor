import * as React from 'react';
import { Character, StoryEvent } from '../../models';
import { Dropdown } from '../../components';

interface Props {
    isNew: boolean;
    charactersOfEvent: Character[];
    selectableCharsAdd: Character[];
    handleAppendCharacter: (c: Character) => void;
    handleRemoveCharacter: (c: Character) => void;
    toObjectView: (o: any) => void;
}

const EventCharactersListEdit = (props: Props) => {
    const charactersOfEvent = props.charactersOfEvent;
    const isNew = props.isNew;
    const selectableCharsAdd = props.selectableCharsAdd;

    return (
    <div className="container-box">
      <label htmlFor="character-list">present characters</label>
      <div id="character-list">
        <ul>
          { 
            isNew ? null :
            charactersOfEvent.map( (char: Character, idx: number) => (
              <li key={idx} onClick={() => props.toObjectView(char)}>
                <a href="#">
                {char.name}
                </a> 
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
          // list of characters not yet added to the event
          listElements={[''].concat( selectableCharsAdd.map( char => char.name ) )}
          handleSelect={(idxPlusOne: number) => {
            const idx = idxPlusOne - 1;
            props.handleAppendCharacter(selectableCharsAdd[idx]);
          }}
        />
        )}
      </div>
      <div className="six columns">
        {charactersOfEvent.length > 0 && (
        <Dropdown
          label="remove character"
          index={0}
          // list of characters already added to the event
          listElements={[''].concat( charactersOfEvent.map( char => char.name ) )}
          handleSelect={(idxPlusOne: number) => {
            const idx = idxPlusOne - 1;
            props.handleRemoveCharacter(selectableCharsAdd[idx]);
          }}
        />
        )}
      </div>
    </div>
    );
};

export default EventCharactersListEdit;