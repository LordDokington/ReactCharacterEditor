import * as React from 'react';
import { GUID } from 'utils/guidUtils';
import * as IconUtils from 'utils/iconUtils';

export interface Props {
  id?: string;
  label?: string;
  index: number;
  listElements: string[];
  icons?: (JSX.Element | undefined)[];
  handleSelect: (idx: number) => void;
}

const Dropdown: React.SFC<Props> = (props: Props): JSX.Element => {
  const hasLabel = props.label !== undefined;
  const id = props.id;
  const index = props.index;
  const listElements = props.listElements;
  const icons = props.icons;

  const clickHandler = (idx: number) => (e: React.MouseEvent<HTMLAnchorElement>) => props.handleSelect(idx);

  return (
    <div className="dropdown" id={id}>
      {hasLabel && <label htmlFor={id}>{props.label}</label>}
      <button className="dropbutton">
        <div>
          {listElements[index]}
          {icons && icons[index] && <span className="icon">{icons[index]}</span>}
        </div>
        <span className="arrow-down">{IconUtils.buttonIcon('fa-lg fa-caret-down')}</span>
      </button>
      <div className="content">
        {listElements.map((element: string, i: number) => (
          <a className={'entry' + (i === index ? ' selected' : '')} key={i} onClick={clickHandler(i)}>
            {element}
            {icons && icons[i] && <span style={{ float: 'right' }}>{icons[i]}</span>}
          </a>
        ))}
      </div>
    </div>
  );
};

Dropdown.defaultProps = {
  id: GUID(),
};

export default Dropdown;
