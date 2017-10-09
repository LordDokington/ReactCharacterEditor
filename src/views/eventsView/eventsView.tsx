import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place, StoryEvent } from '../../models';
import EventEdit from './eventEdit';
import { SelectionGroup } from '../selectionGroup';
import { Checkbox } from '../../components';

export interface EventViewProps extends ViewProps<StoryEvent> {
  places: Place[];
  characters: Character[];
  charactersOfEvent: (event: StoryEvent) => Character[];
}

export default class EventView extends BaseView<StoryEvent> {
  constructor(props: EventViewProps) {
    super(props);
  }

  render(): JSX.Element {
      const events = this.props.objects;
      const isNew = this.state.isNew || events.length === 0;
      const isEmptyView: boolean = isNew;

      const currentEvent = isEmptyView ?
        { name: undefined, description: undefined, thumbnail: '' } : 
        events[ this.selectionIdx ];

      // TODO: only needed when view is not empty
      const listOfChecked = isEmptyView ? null : this.props.charactersOfEvent(currentEvent);

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
          <div className="container">
            <label htmlFor="character-list">present characters</label>
            <div id="character-list">
              <ul>
                { 
                  isEmptyView ? null :
                  this.props.characters.map( (char: Character, idx: number) => {
                    <li key={idx}>
                      <Checkbox
                        id={char.id} 
                        label={char.name} 
                        checked={listOfChecked.includes(char)} 
                        onChange={() => {}} 
                      />
                    </li>
                  })
                }
              </ul>
            </div>
          </div>
          
        </div>
      );
  }
}
