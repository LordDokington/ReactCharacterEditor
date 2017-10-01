import * as React from 'react';
import * as IconUtils from '../utils/iconUtils';
import { Selector, Props as SelectorProps } from "./selector";

interface Props extends SelectorProps {
  deleteButtonVisible: boolean;
  handleDeleteButtonClick: () => void;
  handleNewButtonClick: () => void;
}

export const SelectionGroup = (props: Props) => ( 
  <div>
    <Selector {...props} />
    <button 
      className="button button-primary"
      onClick={props.handleNewButtonClick}
    >
      new {IconUtils.buttonIcon("fa-plus")}
    </button>

    { props.deleteButtonVisible && 
      <button 
        className="button button-primary button-left-margin"
        onClick={props.handleDeleteButtonClick}
      >
        delete {IconUtils.buttonIcon("fa-trash")}
      </button> }
  </div>
);