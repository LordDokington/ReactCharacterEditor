import * as React from 'react';
import * as IconUtils from 'utils/iconUtils';
import Dropdown, { Props as DropdownProps } from 'components/dropdown';

interface Props extends DropdownProps {
  newMode: boolean;
  handleDeleteButtonClick: () => void;
  handleDiscardButtonClick: () => void;
  handleNewButtonClick: () => void;
}

export const SelectionGroup = (props: Props) => {
  const { newMode, listElements, handleDiscardButtonClick, handleDeleteButtonClick, handleNewButtonClick } = props;
  const showDropdown: boolean = !newMode && props.listElements.length > 1;
  const characterLabel = newMode ? '<CREATE NEW>' : listElements[props.index] || 'no object selected';

  return (
    <div className={'selection-group' + (newMode ? ' new' : '')}>
      <div className="selection-main">
        <h2>{characterLabel}</h2>
        {showDropdown && <Dropdown {...props} />}
      </div>

      {!newMode && (
        <button className="button button-primary" onClick={handleNewButtonClick}>
          new {IconUtils.buttonIcon('fa-plus')}
        </button>
      )}
      <button
        className="button button-primary button-left-margin"
        onClick={newMode ? handleDiscardButtonClick : handleDeleteButtonClick}
      >
        {newMode ? 'discard' : 'delete'}
        {IconUtils.buttonIcon('fa-trash')}
      </button>
    </div>
  );
};
