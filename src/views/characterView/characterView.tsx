import * as React from 'react';
import { BaseView, ViewProps } from 'views/baseView';
import { Character, Place, StoryEvent } from 'models';
import CharacterEdit from './characterEdit';
import { SelectionGroup } from 'views/selectionGroup';
import ThumbnailList from 'views/thumbnailList';

class EventsList extends ThumbnailList<Event> {}
class PlacesList extends ThumbnailList<Place> {}

export interface Props extends ViewProps<Character> {
  placesOfCharacter(char: Character): Place[];
  eventsOfCharacter(char: Character): Event[];
}

export default class CharacterView extends BaseView<Character> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const { objects: characters, placesOfCharacter, eventsOfCharacter } = this.props;
    const isNew = this.isNew;
    const isEmptyView: boolean = isNew;

    const currentChar: Character = isEmptyView ? new Character('', '', 0, '', 'male') : characters[this.selectionIdx];

    return (
      <div>
        <div className="container-box">
          <SelectionGroup
            index={this.selectionIdx}
            listElements={characters.map((char: Character) => char.name)}
            handleSelect={this.updateIndex}
            handleNewButtonClick={() => this.setNewMode(true)}
            handleDeleteButtonClick={this.handleDeleteObject}
            handleDiscardButtonClick={() => this.setNewMode(false)}
            newMode={isNew}
          />
        </div>
        <div className={'container-box' + (isNew ? ' new' : '')}>
          <CharacterEdit
            {...currentChar}
            isNew={isNew}
            handleSubmitCharacter={this.handleSubmitObject}
            handleAbort={() => this.setNewMode(false)}
          />
        </div>
        <div className="container-box">
          <label htmlFor="places-list">places this character appears at</label>
          <div id="places-list">
            <PlacesList items={placesOfCharacter(currentChar)} toObjectView={this.props.toObjectView} />
          </div>
        </div>
        <div className="container-box">
          <label htmlFor="places-list">events this character acts in</label>
          <div id="places-list">
            <EventsList items={eventsOfCharacter(currentChar)} toObjectView={this.props.toObjectView} />
          </div>
        </div>
      </div>
    );
  }
}
