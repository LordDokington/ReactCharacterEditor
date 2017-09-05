import * as React from "react";
import { Place } from "../../models/place";

interface PlaceSelectionProps {
  value: string; 
  places: Place[];
  handleSelectPlace: (idx: number) => void;
}

export const PlaceSelection = (props: PlaceSelectionProps): JSX.Element => (
  <div>
    <select
      className="character-selection"
      id="characters"
      value={props.value}
      onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                    props.handleSelectPlace( e.target.selectedIndex ) } 
    >
      { props.places.map( (place: Place, i) => <option key={"placeOption_" + i} value={place.name}>{place.name}</option> ) }
    </select>
  </div>
);