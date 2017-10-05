import * as React from 'react';
import { BaseView, ViewProps } from '../baseView';
import { Character, Place } from '../../models';
import CharacterEdit from './characterEdit';
import { SelectionGroup } from '../selectionGroup';

export interface Props extends ViewProps<Character> {
  placesOfCharacter(char: Character): Place[];
}

export default class CharacterView extends BaseView<Character> {
  constructor(props: Props) {
    super(props);
  }

  get optionValueForCurrentIndex(): string {
    const characters: Character[] = this.props.objects;
    const idx = this.selectionIdx;
    return characters[ idx ] ? characters[ idx ].name : '';
  }

  render(): JSX.Element {
      const characters = this.props.objects;
      const isNew = this.state.isNew || characters.length === 0;
      const isEmptyView: boolean = isNew;

      const currentChar: Character = isEmptyView ?
        { name: undefined, age: undefined, thumbnail: '' } : 
        characters[ this.selectionIdx ];

      return(
        <div>
          <div className="container" >
            <CharacterEdit
              {...currentChar}
              isNew={isNew}
              handleSubmitCharacter={this.handleSubmitObject} 
              handleAbort={() => this.setNewMode(false)}
            />
          </div>
          <div className="container" >
            <SelectionGroup
              index={this.selectionIdx}
              listElements={ characters.map( (char: Character) => char.name )}
              handleSelect={this.updateIndex}
              handleNewButtonClick={() => this.setNewMode(true)}
              handleDeleteButtonClick={this.handleDeleteObject}
              deleteButtonVisible={this.props.objects.length > 0 && !isNew}
            />
          </div>
          <div className="container" >
            <ul>
              {
                (this.props.placesOfCharacter(currentChar)).map( (p: Place, i: number) => <li key={i}>p.name</li> )
              }
            </ul>
          </div>
        </div>
      );
  }
}
