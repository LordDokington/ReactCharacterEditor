import * as React from 'react';
import * as IconUtils from "../../utils/iconUtils";
import * as FileUtils from "../../utils/fileUtils";
import { StoryEvent, Place } from "../../models";
import { Portrait, Selector } from "../../components";

interface Props extends StoryEvent {
  places: Place[];
  isNew: boolean;
  handleSubmitEvent: (event: StoryEvent) => void;
  handleAbort: () => void;
}

interface State {
  name: string;
  description: string;
  invalidated: boolean;
  thumbnail: string;
  placeIdx: number;
}

export default class EventEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      placeIdx: 0,
      name: props.name ? props.name : '',
      description: props.description ? props.description.toString() : '',
      invalidated: false,
      thumbnail: ''
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : '',
      description: nextProps.description ? nextProps.description.toString() : '',
      thumbnail: nextProps.thumbnail,
      invalidated: false,
      placeIdx: this.props.places.findIndex(place => place.id === this.props.placeId )
    } );
  }

  updateName = (name: string): void => this.setState({ name: name, invalidated: true });
  updateDescription = (description: string): void => this.setState({ description: description, invalidated: true });

  submitEvent = (): void => {
    // cannot create event without place
    // TODO: inform user that nothing is done and why
    const place = this.props.places[this.state.placeIdx];
    if(!place) {
      alert('no update because undefined place');
      return;
    }
    const newEvent = new StoryEvent( this.state.name, 
                                     this.state.description, 
                                     place,
                                     this.state.thumbnail,
                                    );
    this.props.handleSubmitEvent( newEvent );
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
          placeholder="event.jpg"
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
          <div className="six columns">
            <Selector
              label="select place"
              index={this.state.placeIdx}
              listElements={this.props.places.map( place => place.name )}
              handleSelect={(idx) => {
                this.setState( {placeIdx: idx, invalidated: true} );
              }}
            />
          </div>
        </div>
        <label htmlFor="place-description">description</label>
        <textarea 
          type="text" 
          placeholder="..." 
          id="place-description" 
          className="form-textarea" 
          rows={10} 
          value={this.state.description}
          onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => this.updateDescription(e.target.value) }
        />
    
        { this.state.invalidated && (
          <button 
            onClick={this.submitEvent}
            className="button-primary"
          >
            {this.props.isNew ? "add" : "update"} {IconUtils.buttonIcon("fa-check")}
          </button>) 
        } 
        { (this.props.isNew || this.state.invalidated) && (
          <button 
            onClick={this.props.handleAbort}
            className="button-primary"
          >
            discard {IconUtils.buttonIcon("fa-times")}
          </button>) 
        }
      </div>
    );
  }
}
