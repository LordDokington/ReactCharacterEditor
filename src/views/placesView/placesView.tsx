import * as React from "react";   
import * as IconUtils from "../../utils/iconUtils";
import PlaceEdit from "./placeEdit"
import { PlaceSelection } from "./placeSelection"

import { Character } from "../../models/character";
import { Place } from "../../models/place";

export interface PlacesViewProps {
  characters: Character[];
  places: Place[];
  appendPlace: (place: Place) => void;
  updatePlace: (index: number) => (place: Place) => void;
  deletePlace: (index: number) => void;
}

interface PlacesViewState {
  selectionIdx: number,
  isNew: boolean
}

export default class PlacesView extends React.Component<PlacesViewProps, PlacesViewState> {
  constructor(props) {
    super(props);

    const storedState = this.fromLocalStorage();
    if( storedState )
      this.state = storedState;
    else
      this.state = {
        selectionIdx: -1,
        isNew: true
      }
  }

  componentWillReceiveProps(nextProps: PlacesViewProps) {
    const thisPlacesCount = this.props.places.length;
    const nextPlacesCount = nextProps.places.length;
    const selectionIdx = this.state.selectionIdx;
    // if new character list is longer than the previous one, then characters were added. set index to last new one (last in list)
    if(nextPlacesCount > thisPlacesCount) {
      this.setState( {selectionIdx: nextPlacesCount-1, isNew: false} );
    } 
    // if new character list is shorter than the previous one, fix selectionIdx to avoid out of bounds error
    else if(nextPlacesCount-1 < selectionIdx) {
      this.setState( {selectionIdx: nextPlacesCount-1, isNew: false} );
    }
  }

  handleSubmitPlace = (place: Place) => {
    if (this.state.isNew) {
      this.props.appendPlace(place)
    } else {
      this.props.updatePlace(this.state.selectionIdx)(place)
    }
  }

  handleDeletePlace = () => {
    this.props.deletePlace(this.state.selectionIdx);
  }

  updateIndex = (idx: number) => {
    // the 2nd argument is a function that is executed after the state is updated
    this.setState( { selectionIdx: idx, isNew: false }, this.toLocalStorage );
  }

  newPlaceMode = () => {
    this.setState( { isNew: true }, this.toLocalStorage );
  }

  get optionValueForCurrentIndex(): string {
    const places = this.props.places;
    const len = places.length;
    const idx = this.state.selectionIdx;
    return (len === 0 || idx == -1) ? "" : places[ idx ].name;
  }

  toLocalStorage = () => {
    localStorage.setItem( "placesView", JSON.stringify( this.state ) )
  }

  fromLocalStorage = (): PlacesViewState => {
    const levelsJson = localStorage.getItem( "placesView" );
    return levelsJson ? JSON.parse( levelsJson ) : undefined;
  }


  render(): JSX.Element{
    const selectionIdx = this.state.selectionIdx;
    const places: Place[] = this.props.places;
    const isNewPlace: boolean = this.state.isNew;

    const useEmptyPlace: boolean = selectionIdx == -1 || isNewPlace;

    const currentPlace = useEmptyPlace ?
      { name: undefined, description: undefined } : 
      places[ selectionIdx ];

    return (
      <div>
        <div className="container" >
          <PlaceEdit
            name={currentPlace.name}
            description={currentPlace.description}
            handleSubmitPlace={this.handleSubmitPlace}
            isNewPlace={this.state.isNew}
          />
        </div>
        <div className="container">
          <PlaceSelection
            value={this.optionValueForCurrentIndex}
            places={places}
            handleSelectPlace={this.updateIndex} />
          <button 
            className="button button-primary"
            onClick={this.newPlaceMode}
          >new {IconUtils.buttonIcon("fa-plus")}
          </button>

          { this.props.characters.length > 0 && (<button 
            className="button button-primary button-left-margin"
            onClick={this.handleDeletePlace}
            >delete {IconUtils.buttonIcon("fa-trash")}
            </button>) }
        </div>
        <div className="container">
          <label htmlFor="character-list">present characters</label>
          <div id="character-list">
            <ul>
            { this.props.characters.map( (char: Character, idx: number) => <li key={"char_" + idx}>{char.name}</li> ) }
            </ul>
          </div>
      </div>
    </div> );
  }
}
