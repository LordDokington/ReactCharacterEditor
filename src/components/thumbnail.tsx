import * as React from 'react';
import { buttonIcon } from 'utils/iconUtils';

export interface Props {
  image?: string;
  label: string;
  onActivate?: () => void;
  onDiscard?: () => void;
}

export const Thumbnail: React.SFC<Props> = (props: Props) => (
  <div className="thumbnail">
    <a href="#" className="thumbnail-label" onClick={props.onActivate}>
      <div className="image-frame">
        <img src={props.image} alt="" />
      </div>
    </a>
    <a href="#" className="thumbnail-label" onClick={props.onActivate}>
      {props.label}
    </a>
    <div className="thumbnail-delete" onClick={props.onDiscard}>
      {buttonIcon('fa-2x fa-times-circle')}
    </div>
  </div>
);

Thumbnail.defaultProps = {
  image: '<no image>',
  onActivate: () => {},
  onDiscard: () => {},
};
