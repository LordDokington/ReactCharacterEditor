import * as React from 'react';
import { buttonIcon } from 'utils/iconUtils';

export interface Props {
  image?: string;
  label: string;
  onActivate?: () => void;
  onDiscard?: () => void;
}

export const Thumbnail: React.SFC<Props> = ({ label, image, onActivate, onDiscard }: Props) => (
  <div className="thumbnail">
    <a href="#" className="thumbnail-label" onClick={onActivate}>
      <div className="image-frame">
        <img src={image} alt="" />
      </div>
    </a>
    <a href="#" className="thumbnail-label" onClick={onActivate}>
      {label}
    </a>
    {onDiscard && (
      <div className="thumbnail-delete" onClick={onDiscard}>
        {buttonIcon('fa-2x fa-times-circle')}
      </div>
    )}
  </div>
);

Thumbnail.defaultProps = {
  image: '<no image>',
};
