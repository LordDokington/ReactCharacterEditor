import * as React from 'react';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox = (props: Props) => {

  return (
    <div>
    <input id={props.id} checked={props.checked} onChange={props.onChange} type="checkbox"/>
      <label htmlFor={props.id}>{props.label}</label>
    </div>);
};

export default Checkbox;