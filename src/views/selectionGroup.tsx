import * as React from "react";
import { Selector, SelectorProps } from "./selector"
import * as IconUtils from "../utils/iconUtils";

interface SelectionGroupProps extends SelectorProps {
  deleteButtonVisible: boolean;
  handleDeleteButtonClick: () => void;
}

export const SelectionGroup = (props: SelectionGroupProps) => ( 
<div>
  <Selector
    value={props.value}
    listElements={props.listElements}
    handleSelect={props.handleSelect} />
  <button 
    className="button button-primary"
    onClick={() => this.setNewPlaceMode(true)}
  >new {IconUtils.buttonIcon("fa-plus")}
  </button>

  { props.deleteButtonVisible && (<button 
    className="button button-primary button-left-margin"
    onClick={props.handleDeleteButtonClick}
    >delete {IconUtils.buttonIcon("fa-trash")}
    </button>) }
  </div>
)