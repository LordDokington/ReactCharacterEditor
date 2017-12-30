import * as React from 'react';
import { Character } from 'models';
import { Dropdown, Thumbnail } from 'components';
import { Props as ThumbnailProps } from 'components/thumbnail';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { buttonIcon } from 'utils/iconUtils';

interface Props<T> {
  isNew: boolean;
  items: T[];
  addableItems: T[];
  udateItems: (items: T[]) => void;
  toObjectView: (o: any) => void;
}

const AddItemButton = ({ addableItems, onAdd }) => {
  return (
    <div className="add-item-button">
      {buttonIcon('fa-5x fa-plus-circle fa')}
      <ul className="add-list">
        {addableItems.map((char: Character, idx: number) => (
          <li className="add-list-item" onClick={() => onAdd(char)}>
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

class ThumbnailList<T> extends React.Component<Props<T>, {}> {
  constructor(props: Props<T>) {
    super(props);
  }

  // maps a character onto the properties of the corresponding character list item
  toThumbnailProps = (item: T, idx: number): ThumbnailProps => {
    const { toObjectView, udateItems, items } = this.props;
    const { thumbnail, name } = item as any;

    return {
      image: thumbnail,
      label: name,
      onActivate: () => toObjectView(item),
      onDiscard: () => {
        items.splice(idx, 1);
        udateItems(items);
      },
    };
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { udateItems, items } = this.props;
    udateItems(arrayMove(items, oldIndex, newIndex));
  };

  render() {
    const { addableItems, items, udateItems } = this.props;
    const thumbnails = items.map(this.toThumbnailProps);

    return (
      <div className="container-box">
        <label htmlFor="character-list">present characters</label>
        <SortableThumbnailList items={thumbnails} onSortEnd={this.onSortEnd} axis="xy" />
        <AddItemButton
          addableItems={addableItems}
          onAdd={(item: T) => {
            const itemsNext = items.slice();
            itemsNext.push(item);
            udateItems(itemsNext);
          }}
        />
      </div>
    );
  }
}

const SortableListItem = SortableElement((props: ThumbnailProps) => {
  return (
    <div className="sortableListItem">
      <Thumbnail {...props} />
    </div>
  );
});

const SortableThumbnailList = SortableContainer(({ items }) => {
  return <div>{items.map((item, idx) => <SortableListItem key={idx} index={idx} {...item} />)}</div>;
});

export default ThumbnailList;