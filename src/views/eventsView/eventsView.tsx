import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place, StoryEvent } from '../../models';
import EventEdit from './eventEdit';
import { SelectionGroup } from '../selectionGroup';
import EventCharactersListEdit from './eventCharactersListEdit';

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
      const events = this.props.objects;
      const isNew = this.state.isNew || events.length === 0;
      const isEmptyView: boolean = isNew;

      const currentEvent: StoryEvent = isEmptyView ? {} : events[ this.selectionIdx ];

      let charactersOfEvent, characterIdsOfEvent, selectableCharsAdd;

      if( !isEmptyView ) {
        // TODO: only needed when view is not empty
        charactersOfEvent = this.props.charactersOfEvent(currentEvent);
        characterIdsOfEvent = charactersOfEvent.map( char => char.id );

        selectableCharsAdd = this.props.characters
          .filter( char => !characterIdsOfEvent.includes( char.id ) );
      } else {
        charactersOfEvent = [];
        characterIdsOfEvent = [];

        selectableCharsAdd = this.props.characters;
      }

      return(
        <div>
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
          <div className="container" >
            <EventEdit
              {...currentEvent}
              places={this.props.places}
              isNew={isNew}
              handleSubmitEvent={this.handleSubmitObject} 
              handleAbort={() => this.setNewMode(false)}
            />
          </div>
         <EventCharactersListEdit
          isEmptyView={isEmptyView}
          charactersOfEvent={charactersOfEvent}
          selectableCharsAdd={selectableCharsAdd}
          currentEvent={currentEvent}
          handleUpdateEvent={this.handleSubmitObject}
         />
        </div>
      );
  }
}
