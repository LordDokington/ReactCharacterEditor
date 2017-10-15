import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place, StoryEvent } from '../../models';
import EventEdit from './eventEdit';
import { SelectionGroup } from '../selectionGroup';
import { Selector } from '../../components';

export interface Props extends ViewProps<StoryEvent> {
  places: Place[];
  characters: Character[];
  charactersOfEvent: (event: StoryEvent) => Character[];
}

export default class EventView extends BaseView<StoryEvent> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
      const events: StoryEvent[] = this.props.objects;
      const isNew = this.state.isNew || events.length === 0;
      const isEmptyView: boolean = isNew;

      let currentEvent: StoryEvent | undefined = isEmptyView ?
        undefined : 
        events[ this.selectionIdx ];

      // TODO: only needed when view is not empty
      const charactersOfEvent = isEmptyView ? null : this.props.charactersOfEvent(currentEvent);
      const characterIdsOfEvent = charactersOfEvent.map( char => char.id );

      const selectableCharsAdd = this.props.characters
        .filter( char => !characterIdsOfEvent.includes( char.id ) );

      return(
        <div>
          <div className="container" >
            <EventEdit
              {...currentEvent}
              places={this.props.places}
              isNew={isNew}
              handleSubmitEvent={this.handleSubmitObject} 
              handleAbort={() => this.setNewMode(false)}
            />
          </div>
          <div className="container" >
            <SelectionGroup
              index={this.selectionIdx}
              listElements={ events.map( (event: StoryEvent) => event.name )}
              handleSelect={this.updateIndex}
              handleNewButtonClick={() => this.setNewMode(true)}
              handleDeleteButtonClick={this.handleDeleteObject}
              deleteButtonVisible={events.length > 0 && !isNew}
            />
          </div>
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
            <div>
            <div className="six columns">
              {selectableCharsAdd.length > 0 && (
              <Selector
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
                  this.handleSubmitObject(currentEvent);
                }}
              />
              )}
            </div>
            <div className="six columns">
              {charactersOfEvent.length > 0 && (
              <Selector
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
                  this.handleSubmitObject(currentEvent);
                }}
              />
              )}
            </div>
          </div>
          </div>
        </div>
      );
  }
}
