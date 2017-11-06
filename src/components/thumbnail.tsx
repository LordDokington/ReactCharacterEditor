import * as React from 'react';

interface Props {
  image?: string;
  label: string;
}

const Thumbnail = (props: Props) => (
  <div className="thumbnail">
  <img 
    src={props.image}
    alt={"source: " + props.image} 
  />
  <div>{props.label}</div>
  </div>
);

export default Thumbnail;