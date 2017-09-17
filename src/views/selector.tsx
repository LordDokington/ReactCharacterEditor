import * as React from "react";

export interface SelectorProps {
  value: string;
  listElements: string[];
  handleSelect: (idx: number) => void;
}

export const Selector = (props: SelectorProps): JSX.Element => (
  <div>
    <select
      className="selector"
      value={props.value}
      onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                    props.handleSelect( e.target.selectedIndex ) } 
    >
      { props.listElements.map( (element: string, i) => <option key={"option_" + i} value={element}>{element}</option> ) }
    </select>
  </div>
);