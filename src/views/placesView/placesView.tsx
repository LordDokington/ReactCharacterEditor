import * as React from "react";   
import { BaseView, ViewProps } from "../baseView";
import PlaceEdit from "./placeEdit"
import { SelectionGroup } from "../selectionGroup"

import { Character } from "../../models/character";
import { Place } from "../../models/place";

export interface PlacesViewProps extends ViewProps<Place> {
  characters: Character[];
}

export default class PlacesView extends BaseView<Place> {
  constructor(props) {
    super(props);
  }

  get optionValueForCurrentIndex(): string {
    const places: Place[] = this.props.objects;
    const idx = this.selectionIdx;
    return places[ idx ] ? places[ idx ].name : "";
  }

  render(): JSX.Element{
    const selectionIdx = this.selectionIdx;
    const places: Place[] = this.props.objects;
    const isNew: boolean = this.state.isNew || places.length === 0;
    const isEmptyView: boolean = isNew;

    const currentPlace = isEmptyView ?
      { name: undefined, description: undefined, thumbnail: "" } : 
      places[ selectionIdx ];

    return (
      <div>
        <div className="container" >
          <PlaceEdit
            {...currentPlace}
            handleSubmitPlace={this.handleSubmitObject}
            handleAbort={() => this.setNewMode(false)}
            isNew={isNew}
          />
        </div>
        <div className="container">
          <SelectionGroup
            value={this.optionValueForCurrentIndex}
            listElements={ places.map( (place: Place) => place.name )}
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
            { (this.props as PlacesViewProps).characters.map( (char: Character, idx: number) => <li key={"char_" + idx}>{char.name}</li> ) }
            </ul>
          </div>
      </div>
    </div> );
  }
}
