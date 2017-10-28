import * as React from 'react';
import { GUID } from "../utils/guidUtils";

export interface Props {
  id?: string;
  label?: string;
  index: number;
  listElements: string[];
  handleSelect: (idx: number) => void;
}

const Dropdown = (props: Props): JSX.Element => {
  const hasLabel = props.label !== undefined;
  const id = props.id || GUID();
  const listElements = props.listElements;

  const clickHandler = (idx: number) => (e: React.MouseEvent<HTMLAnchorElement>) => 
    props.handleSelect(idx);

  return (
    <div className="dropdown"
      id={id}
    >
      {hasLabel && <label htmlFor={id}>{props.label}</label>}
      <button className="dropbutton">{listElements[props.index]}</button>
      <div className="content">
        { listElements.map( 
              (element: string, i: number) => 
                <a 
                  href="#" 
                  key={i} 
                  value={i}
                  onClick={ clickHandler(i) } 
                >
                  {element}
                </a> 
            ) 
        }
      </div>
    </div>
  );
};

export default Dropdown;