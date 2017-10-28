import * as React from 'react';
import * as IconUtils from '../utils/iconUtils';
import Dropdown, { Props as DropdownProps } from "../components/dropdown";

interface Props extends DropdownProps {
  deleteButtonVisible: boolean;
  handleDeleteButtonClick: () => void;
  handleNewButtonClick: () => void;
}

export const SelectionGroup = (props: Props) => ( 
  <div className="selection-group">
    <h2>{props.listElements[props.index] || 'no character selected'}</h2>
    <div>
      <button 
        className="button button-primary"
        onClick={props.handleNewButtonClick}
      >
        new {IconUtils.buttonIcon("fa-plus")}
      </button>

      {props.listElements.length > 1 && <Dropdown {...props} />}

      { props.deleteButtonVisible && 
        <button 
          className="button button-primary button-left-margin"
          onClick={props.handleDeleteButtonClick}
        >
          delete {IconUtils.buttonIcon("fa-trash")}
        </button> }
    </div>

  </div>
);