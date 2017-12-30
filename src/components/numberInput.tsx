import * as React from 'react';
import { GUID } from 'utils/guidUtils';

interface Props {
  id?: string;
  content: string | number;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange: (newContent: string) => void;
}

const NumberInput: React.SFC<Props> = (props: Props) => {
  const hasLabel = props.label !== undefined;
  const placeholder = props.placeholder || props.label;
  const id = props.id;
  const handler = (e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value);

  return (
    <div className="input-component">
      {hasLabel && <label htmlFor={id}>{props.label}</label>}
      <input
        className="u-full-width"
        type="number"
        placeholder={placeholder}
        id={id}
        min={props.min}
        max={props.max}
        value={props.content}
        onChange={handler}
      />
    </div>
  );
};

NumberInput.defaultProps = {
  id: GUID(),
};

export default NumberInput;
