import * as React from 'react';
import { Character } from 'models';
import { Dropdown, Thumbnail } from 'components';
import { Props as ThumbnailProps } from 'components/thumbnail';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { buttonIcon } from 'utils/iconUtils';

interface Props<T> {
  items: T[];
  addableItems?: T[];
  sortable?: boolean;
  updateItems?: (items: T[]) => void;
  toObjectView: (o: any) => void;
}

const AddItemButton = ({ addableItems, onAdd }) => {
  const active: boolean = addableItems.length > 0;

  return (
    <div className={'add-item-button' + (active ? '' : ' inactive')}>
      {buttonIcon('fa-5x fa-plus-circle fa')}
      <ul className="add-list scroll-y">
        {addableItems.map((char: Character, idx: number) => (
          <li className="add-list-item" key={idx} onClick={() => onAdd(char)}>
            {char.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

class ThumbnailList<T> extends React.Component<Props<T>, {}> {
  static defaultProps = {
    sortable: false,
    addableItems: [],
  };

  constructor(props: Props<T>) {
    super(props);
  }

  // maps a character onto the properties of the corresponding character list item
  toThumbnailProps = (item: T, idx: number): ThumbnailProps => {
    const { toObjectView, updateItems, items } = this.props;
    const { thumbnail, name } = item as any;

    const onActivate = () => toObjectView(item);
    const onDiscard = updateItems
      ? () => {
          items.splice(idx, 1);
          updateItems(items);
        }
      : undefined;

    return {
      image: thumbnail,
      label: name,
      onActivate,
      onDiscard,
    };
  };

  onSortEnd = this.props.updateItems &&
    (({ oldIndex, newIndex }) => {
      const { updateItems, items } = this.props;
      (updateItems as ((_) => void))(arrayMove(items, oldIndex, newIndex));
    });

  render() {
    const { addableItems, items, updateItems, sortable } = this.props;
    const thumbnails = items.map(this.toThumbnailProps);

    return (
      <div className="thumbnail-list">
        <ListContainer
          sortable={sortable}
          items={thumbnails}
          addableItems={addableItems}
          onAdd={
            // no handler if no update function defined
            updateItems &&
            ((item: T) => {
              const itemsNext = items.slice();
              itemsNext.push(item);
              updateItems(itemsNext);
            })
          }
          onSortEnd={this.onSortEnd}
          axis="xy"
        />
      </div>
    );
  }
}

const ListItem = (props: ThumbnailProps) => {
  return (
    <div className="sortable list-item">
      <Thumbnail {...props} />
    </div>
  );
};

const SortableListItem = SortableElement(ListItem);

const ListContainer = SortableContainer(({ items, addableItems, onAdd, sortable }) => {
  return (
    <div className="thumbnail-list-elements">
      {items.map(
        (item, idx) =>
          sortable ? <SortableListItem key={idx} index={idx} {...item} /> : <ListItem key={idx} {...item} />
      )}
      <div className="list-item">
        <AddItemButton addableItems={addableItems} onAdd={onAdd} />
      </div>
    </div>
  );
});

export default ThumbnailList;
