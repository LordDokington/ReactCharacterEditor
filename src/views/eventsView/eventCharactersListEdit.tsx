import * as React from 'react';
import { Character } from '../../models';
import { Dropdown, Thumbnail, ThumbnailAdd } from '../../components';
import { Props as ThumbnailProps } from '../../components/thumbnail';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { buttonIcon } from '../../utils/iconUtils';

interface Props {
  isNew: boolean;
  charactersOfEvent: Character[];
  selectableCharsAdd: Character[];
  updateCharacterList: (characters: Character[]) => void;
  toObjectView: (o: any) => void;
}

const SortableListItem = SortableElement((props: ThumbnailProps) => {
  return (
    <div className="sortableListItem">
      <Thumbnail {...props} />
    </div>
  );
});

const SortableCharacterList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((item, idx) => <SortableListItem key={idx} index={idx} {...item} />)}
      <div className="add-item-button">{buttonIcon('fa-5x fa-plus-circle fa')}</div>
    </div>
  );
});

class EventCharactersListEdit extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  // maps a character onto the properties of the corresponding character list item
  charToItem = (char: Character, idx: number): ThumbnailProps => {
    const { toObjectView, updateCharacterList, charactersOfEvent } = this.props;
    const { thumbnail, name } = char;

    return {
      image: thumbnail,
      label: name,
      onActivate: () => toObjectView(char),
      onDiscard: () => {
        console.log(idx);
        charactersOfEvent.splice(idx, 1);
        updateCharacterList(charactersOfEvent);
      },
    };
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { updateCharacterList, charactersOfEvent } = this.props;
    updateCharacterList(arrayMove(charactersOfEvent, oldIndex, newIndex));
  };

  render() {
    const { selectableCharsAdd, charactersOfEvent, updateCharacterList } = this.props;
    const items = charactersOfEvent.map(this.charToItem);

    return (
      <div className="container-box">
        <label htmlFor="character-list">present characters</label>
        <SortableCharacterList items={items} onSortEnd={this.onSortEnd} axis="xy" />
        {selectableCharsAdd.length > 0 && (
          <Dropdown
            label="add character"
            index={0}
            // list of characters not yet added to the event
            listElements={[''].concat(selectableCharsAdd.map(char => char.name))}
            handleSelect={(idxPlusOne: number) => {
              const idx = idxPlusOne - 1;
              const chars = charactersOfEvent.slice();
              chars.push(selectableCharsAdd[idx]);
              updateCharacterList(chars);
            }}
          />
        )}
      </div>
    );
  }
}

export default EventCharactersListEdit;
