import * as React from 'react';   
import { BaseView, ViewProps } from '../baseView';
import PlaceEdit from './placeEdit';
import { SelectionGroup } from '../selectionGroup';
import { Character, Place, StoryEvent } from '../../models';

export interface Props extends ViewProps<Place> {
  characters: Character[];
  charactersOfPlace(place: Place): Character[];
  eventsOfPlace(place: Place): StoryEvent[];
}

export default class PlacesView extends BaseView<Place> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const selectionIdx = this.selectionIdx;
    const places: Place[] = this.props.objects;
    const isNew: boolean = this.state.isNew || places.length === 0;
    const isEmptyView: boolean = isNew;
    const currentPlace = isEmptyView ? {} : places[ selectionIdx ];

    const eventsOfPlace = this.props.eventsOfPlace(currentPlace);
    const charactersOfPlace = this.props.charactersOfPlace(currentPlace);

    return (
      <div>
        <div className="container">
          <SelectionGroup
            index={this.selectionIdx}
            listElements={ places.map( (place: Place) => place.name )}
            handleSelect={this.updateIndex}
            handleNewButtonClick={() => this.setNewMode(true)}
            handleDeleteButtonClick={this.handleDeleteObject}
            deleteButtonVisible={this.props.objects.length > 0 && !isNew} 
          />
        </div>
        <div className="container" >
          <PlaceEdit
            {...currentPlace}
            handleSubmitPlace={this.handleSubmitObject}
            handleAbort={() => this.setNewMode(false)}
            isNew={isNew}
          />
        </div>
        <div className="container">
          <label htmlFor="event-list">events happening at this place</label>
          <div id="event-list">
            <ul> 
              { 
                isEmptyView ? null :
                eventsOfPlace.map( (e: StoryEvent, idx: number) => <li key={idx}>{e.name}</li> ) 
              }
            </ul>
          </div>
        </div>
        <div className="container">
          <label htmlFor="character-list">present characters at any event</label>
          <div id="character-list">
            <ul> 
              { 
                isEmptyView ? null :
                charactersOfPlace.map( (char: Character, idx: number) => <li key={idx}>{char.name}</li> ) 
              }
            </ul>
          </div>
        </div>
    </div> );
  }
}
