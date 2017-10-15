import * as React from 'react';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: Props) => {

  return (
    <label htmlFor={props.id} className="checkbox">
      <input id={props.id} checked={props.checked} onChange={props.onChange} type="checkbox"/>
      {props.label}
    </label>
  );
};

export default Checkbox;