import * as React from 'react';
import Dropzone from 'react-dropzone';

interface Props {
  id: string;
  content: string;
  label: string;
  multiline?: boolean;
  placeholder?: string;
  onChange: (newContent: string) => void;
}

const TextInput = (props: Props) => {

  const multiline: boolean = props.multiline as boolean;
  const placeholder = props.placeholder || props.label;
  const handler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => props.onChange(e.target.value);

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {multiline ?
        <textarea 
          className="form-textarea" 
          type="text"
          placeholder={placeholder}
          id={props.id}
          rows={10}
          value={props.content}
          onChange={handler}
        /> :
        <input
          className="u-full-width" 
          type="text" 
          placeholder={props.label}
          id={props.id}
          value={props.content} 
          onChange={handler} 
        />
      }
    </div>);
};
export default TextInput;