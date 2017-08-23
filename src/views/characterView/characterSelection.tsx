import * as React from "react";
import { Character } from "../../models/character";

interface CharacterSelectionProps {
  value: string; 
  characters: Character[];
  handleSelectCharacter: (idx: number) => void;
}

export const CharacterSelection = (props: CharacterSelectionProps): JSX.Element => (
  <div>
    <select
      className="character-selection"
      id="characters"
      value={props.value}
      onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                    props.handleSelectCharacter( Number((e as any).target.selectedIndex) ) } 
    >
      { props.characters.map( (char, i) => <option key={"charOption_" + i} value={char.name}>{char.name}</option> ) }
    </select>
  </div>
);