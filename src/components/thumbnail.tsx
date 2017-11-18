import * as React from 'react';

interface Props {
  image?: string;
  label: string;
}

const Thumbnail = (props: Props) => (
  <div className="thumbnail">
    <div className="image-frame">
      <img 
        src={props.image}
      />
    </div>
    <div>{props.label}</div>
  </div>
);

export default Thumbnail;