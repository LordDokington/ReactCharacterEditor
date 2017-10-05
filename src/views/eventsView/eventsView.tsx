import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place, StoryEvent } from '../../models';
import EventEdit from './eventEdit';
import { SelectionGroup } from '../selectionGroup';

export interface EventViewProps extends ViewProps<StoryEvent> {
  places: Place[];
  charactersOfEvent: (event: StoryEvent) => Character[];
}

export default class EventView extends BaseView<StoryEvent> {
  constructor(props: EventViewProps) {
    super(props);
  }

  get optionValueForCurrentIndex(): string {
    const events: StoryEvent[] = this.props.objects;
    const idx = this.selectionIdx;
    return events[ idx ] ? events[ idx ].name : '';
  }

  render(): JSX.Element {
      const events = this.props.objects;
      const isNew = this.state.isNew || events.length === 0;
      const isEmptyView: boolean = isNew;

      const currentEvent = // isEmptyView ?
        // { name: undefined, age: undefined, thumbnail: '' } : 
        events[ this.selectionIdx ];

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
              deleteButtonVisible={this.props.objects.length > 0 && !isNew}
            />
          </div>
          <div className="container" >
            <SelectionGroup
              index={this.selectionIdx}
              listElements={ events.map( (event: StoryEvent) => event.name )}
              handleSelect={this.updateIndex}
              handleNewButtonClick={() => this.setNewMode(true)}
              handleDeleteButtonClick={this.handleDeleteObject}
              deleteButtonVisible={this.props.objects.length > 0 && !isNew}
            />
          </div>
        </div>
      );
  }
}
