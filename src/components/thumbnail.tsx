import * as React from 'react';

interface Props {
  image?: string;
  label: string;
  onActivate: () => void;
}

const Thumbnail: React.SFC<Props> = (props: Props) => (
  <div className="thumbnail" >
    <a href="#" className="thumbnail-label" onClick={props.onActivate}>
      <div className="image-frame">
        <img 
          src={props.image}
        />
      </div>
    </a>
    <a href="#" className="thumbnail-label" onClick={props.onActivate}>{props.label}</a>
  </div>
);

Thumbnail.defaultProps = {
  image: "<no image>"
};

export default Thumbnail;