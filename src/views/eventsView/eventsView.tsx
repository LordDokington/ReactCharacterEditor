import * as React from 'react';
import { BaseView, ViewProps } from 'views/baseView';
import { Character, Place, StoryEvent } from 'models';
import EventEdit from './eventEdit';
import { SelectionGroup } from 'views/selectionGroup';

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
    const { objects: events, characters } = this.props;
    const isNew = this.isNew;

    const currentEvent: StoryEvent = isNew ? {} : events[this.selectionIdx];

    let charactersOfEvent, characterIdsOfEvent;

    if (!isNew && currentEvent) {
      // TODO: only needed when view is not empty
      charactersOfEvent = this.props.charactersOfEvent(currentEvent);
      characterIdsOfEvent = charactersOfEvent.map(char => char.id);
    } else {
      charactersOfEvent = [];
      characterIdsOfEvent = [];
    }

    return (
      <div>
        <div className={'container-box' + (isNew ? ' new' : '')}>
          <SelectionGroup
            index={this.selectionIdx}
            listElements={events.map((event: StoryEvent) => event.name)}
            handleSelect={this.updateIndex}
            handleNewButtonClick={() => this.setNewMode(true)}
            handleDeleteButtonClick={this.handleDeleteObject}
            handleDiscardButtonClick={() => this.setNewMode(false)}
            newMode={isNew}
          />
        </div>
        <div className="container-box">
          <EventEdit
            {...currentEvent}
            places={this.props.places}
            isNew={isNew}
            handleSubmitEvent={this.handleSubmitObject}
            handleAbort={() => this.setNewMode(false)}
            charactersOfEvent={charactersOfEvent}
            availableCharacters={characters}
            toObjectView={this.props.toObjectView}
          />
        </div>
      </div>
    );
  }
}
