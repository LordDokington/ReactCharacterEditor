import * as React from 'react';
import * as IconUtils from '../utils/iconUtils';
import Dropdown, { Props as DropdownProps } from "../components/dropdown";

interface Props extends DropdownProps {
  newMode: boolean;
  handleDeleteButtonClick: () => void;
  handleDiscardButtonClick: () => void;
  handleNewButtonClick: () => void;
}

export const SelectionGroup = (props: Props) => ( 
  <div className={'selection-group' + (props.newMode ? ' new' : '')}>
    <div className="selection-main">
      <h2>{props.newMode ? '<CREATE NEW>' : props.listElements[props.index] || 'no object selected' }</h2>
      {!props.newMode && props.listElements.length > 1 && <Dropdown {...props} />}
    </div>

    {!props.newMode &&
    <button 
      className="button button-primary"
      onClick={props.handleNewButtonClick}
    >
      new {IconUtils.buttonIcon("fa-plus")}
    </button>
    }

    <button 
      className="button button-primary button-left-margin"
      onClick={props.newMode ? props.handleDiscardButtonClick : props.handleDeleteButtonClick}
    >
      {props.newMode ? 'discard' : 'delete'} 
      {IconUtils.buttonIcon("fa-trash")}
    </button>
  </div>
);