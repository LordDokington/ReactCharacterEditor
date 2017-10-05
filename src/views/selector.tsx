import * as React from 'react';

export interface Props {
  index: number;
  listElements: string[];
  handleSelect: (idx: number) => void;
}

export const Selector = (props: Props): JSX.Element => (
  <div>
    <select
      className="selector"
      value={props.index.toString()}
      onChange={ (e: React.ChangeEvent<HTMLSelectElement>) => 
                    props.handleSelect( e.target.selectedIndex ) } 
    >
      { props.listElements.map( 
          (element: string, i: number) => <option key={"option_" + i} value={i}>{element}</option> 
        ) 
      }
    </select>
  </div>
);