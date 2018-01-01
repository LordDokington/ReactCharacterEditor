import * as React from 'react';
import { BaseView, ViewProps } from 'views/baseView';
import PlaceEdit from './placeEdit';
import { SelectionGroup } from 'views/selectionGroup';
import { Character, Place, StoryEvent } from 'models';
import ThumbnailList from 'views/thumbnailList';

class CharactersList extends ThumbnailList<Character> {}
class EventsList extends ThumbnailList<Event> {}

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
    const isNew: boolean = this.isNew;
    const isEmptyView: boolean = isNew;
    const currentPlace = isEmptyView ? {} : places[selectionIdx];

    const eventsOfPlace = this.props.eventsOfPlace(currentPlace);
    const charactersOfPlace = this.props.charactersOfPlace(currentPlace);

    return (
      <div>
        <div className="container-box">
          <SelectionGroup
            index={this.selectionIdx}
            listElements={places.map((place: Place) => place.name)}
            handleSelect={this.updateIndex}
            handleNewButtonClick={() => this.setNewMode(true)}
            handleDeleteButtonClick={this.handleDeleteObject}
            handleDiscardButtonClick={() => this.setNewMode(false)}
            newMode={isNew}
          />
        </div>
        <div className={'container-box' + (isNew ? ' new' : '')}>
          <PlaceEdit
            {...currentPlace}
            handleSubmitPlace={this.handleSubmitObject}
            handleAbort={() => this.setNewMode(false)}
            isNew={isNew}
          />
        </div>
        <div className="container-box">
          <label htmlFor="event-list">events happening at this place</label>
          <div id="event-list">
            <EventsList items={eventsOfPlace} toObjectView={this.props.toObjectView} />
          </div>
        </div>
        <div className="container-box">
          <label htmlFor="character-list">present characters (at any of the events)</label>
          <div id="character-list">
            <CharactersList items={charactersOfPlace} toObjectView={this.props.toObjectView} />
          </div>
        </div>
      </div>
    );
  }
}
