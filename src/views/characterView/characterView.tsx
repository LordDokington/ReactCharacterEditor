import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place, StoryEvent } from '../../models';
import CharacterEdit from './characterEdit';
import { SelectionGroup } from '../selectionGroup';

export interface Props extends ViewProps<Character> {
  placesOfCharacter(char: Character): Place[];
  eventsOfCharacter(char: Character): Event[];
}

export default class CharacterView extends BaseView<Character> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
      const characters = this.props.objects;
      const isNew = this.isNew;
      const isEmptyView: boolean = isNew;

      const currentChar: Character = isEmptyView ? {} : characters[ this.selectionIdx ];

      return(
        <div>
          <div className="container-box" >
            <SelectionGroup
              index={this.selectionIdx}
              listElements={ characters.map( (char: Character) => char.name )}
              handleSelect={this.updateIndex}
              handleNewButtonClick={() => this.setNewMode(true)}
              handleDeleteButtonClick={this.handleDeleteObject}
              handleDiscardButtonClick={() => this.setNewMode(false)}
              newMode={isNew}
            />
          </div>
          <div className={'container-box' + (isNew ? ' new' : '')} >
            <CharacterEdit
              {...currentChar}
              isNew={isNew}
              handleSubmitCharacter={this.handleSubmitObject} 
              handleAbort={() => this.setNewMode(false)}
            />
          </div>
          <div className="container-box" >
            <label htmlFor="places-list">places this character appears at</label>
            <div id="places-list">
              <ul>
                {
                  isEmptyView ? null :
                  (this.props.placesOfCharacter(currentChar)).map( (p: Place, i: number) => 
                    <li key={i} onClick={() => this.props.toObjectView(p)}>
                      <a href="#">
                      {p.name}
                      </a>
                    </li> )
                }
              </ul>
            </div>
          </div>
          <div className="container-box" >
            <label htmlFor="places-list">events this character acts in</label>
            <div id="places-list">
              <ul>
                {
                  isEmptyView ? null :
                  (this.props.eventsOfCharacter(currentChar)).map( (e: StoryEvent, i: number) => 
                  <li key={i} onClick={() => this.props.toObjectView(e)}>
                    <a href="#">
                    {e.name}
                    </a>
                  </li>)
                }
              </ul>
            </div>
          </div>
        </div>
      );
  }
}
