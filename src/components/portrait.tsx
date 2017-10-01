import * as React from 'react';
import Dropzone from 'react-dropzone';

interface Props {
  image?: string;
  placeholder: string;
  onDrop: (files: File[]) => void;
}

const Portrait = (props: Props) => (
  <Dropzone 
    onDrop={props.onDrop} 
    className="character-image"
    activeClassName="place-image-dragged"
  >
    <img 
      src={props.image || props.placeholder}
      alt={"thumbnail source: " + props.image} 
    />
  </Dropzone>
);

export default Portrait;