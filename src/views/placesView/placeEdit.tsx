import * as React from 'react';
import * as IconUtils from "../../utils/iconUtils";
import * as FileUtils from "../../utils/fileUtils";
import { Place } from "../../models";
import { Portrait, TextInput } from "../../components";

interface Props {
  name?: string;
  description?: string;
  thumbnail: string;
  isNew: boolean;
  handleSubmitPlace: (place: Place) => void;
  handleAbort: () => void;
}

interface State {
  name: string;
  description: string;
  invalidated: boolean;
  thumbnail: string;
}

export default class PlaceEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: props.name ? props.name : '',
      description: props.description ? props.description.toString() : '',
      invalidated: false,
      thumbnail: props.thumbnail,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : '',
      description: nextProps.description ? nextProps.description.toString() : '',
      thumbnail: nextProps.thumbnail,
      invalidated: false
    } );
  }

  updateName = (name: string): void => { this.setState( { name, invalidated: true }); };
  updateDescription = (description: string): void => { this.setState( { description, invalidated: true } ); };

  submitPlace = (): void => {
    const newPlace = new Place( this.state.name, this.state.description, this.state.thumbnail );
    this.props.handleSubmitPlace( newPlace );
  }

  onDrop = (files: File[]) => {
    FileUtils.loadFileAsData(files[0], (event) => {
      this.setState({
        // tslint:disable-next-line:no-any
        thumbnail: (event.target as any).result,
        invalidated: true
      });
    });
  }

  render() {
    return (
      <div>
        <Portrait 
          image={this.state.thumbnail}
          placeholder="landscape-sketch.jpg"
          onDrop={this.onDrop} 
        />
        <div className="row">
          <div className="six columns">
            <label htmlFor="place-name">name</label>
            <input 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.updateName(e.target.value) }
              className="u-full-width" 
              type="text" 
              placeholder="name" 
              id="place-description" 
              value={this.state.name} 
            />
          </div>
          <div className="six columns"/>
        </div>
        <TextInput
          id="place-description"
          multiline={true}
          placeholder="..." 
          label="description" 
          content={this.state.description}
          onChange={ (newContent: string) => this.updateDescription(newContent) }
        />
        { this.state.invalidated &&
          <button onClick={this.submitPlace} className="button-primary" >
            {this.props.isNew ? "add" : "update"}
            {IconUtils.buttonIcon("fa-check")}
          </button> 
        }
        { (this.props.isNew || this.state.invalidated) && 
          <button  onClick={this.props.handleAbort} className="button-primary" >
            discard
            {IconUtils.buttonIcon("fa-times")}
          </button> 
        }
      </div>
    );
  }
}
