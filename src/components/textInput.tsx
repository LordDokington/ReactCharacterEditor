import * as React from 'react';
import { GUID } from "../utils/guidUtils";

interface Props {
  id?: string;
  content: string;
  label?: string;
  multiline?: boolean;
  placeholder?: string;
  onChange: (newContent: string) => void;
}

const TextInput = (props: Props) => {

  const multiline: boolean = props.multiline as boolean;
  const hasLabel = props.label !== undefined;
  const placeholder = props.placeholder || props.label;
  const id = props.id || GUID();
  const handler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onChange(e.target.value);

  return (
    <div className="input-component">
      {hasLabel && <label htmlFor={id}>{props.label}</label>}
      {multiline ?
        <textarea 
          className="form-textarea" 
          type="text"
          placeholder={placeholder}
          id={id}
          rows={10}
          value={props.content}
          onChange={handler}
        /> :
        <input
          className="u-full-width" 
          type="text" 
          placeholder={placeholder}
          id={id}
          value={props.content} 
          onChange={handler}
        />
      }
    </div>);
};
export default TextInput;