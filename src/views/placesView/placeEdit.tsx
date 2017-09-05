import * as React from "react";
import * as IconUtils from "../../utils/iconUtils";
import { Place } from "../../models/place";

interface PlaceEditProps {
  name?: string;
  description?: string;
  handleSubmitPlace: (place: Place) => void;
  isNewPlace: boolean;
}

interface PlaceEditState {
  name: string;
  description: string;
  invalidated: boolean;
}

export default class PlaceEdit extends React.Component<PlaceEditProps, PlaceEditState> {
  constructor(props: PlaceEditProps) {
    super(props);

    this.state = {
      name: props.name ? props.name : "",
      description: props.description ? props.description.toString() : "",
      invalidated: false
    }
  }

  componentWillReceiveProps(nextProps: PlaceEditProps) {
    this.setState ( {
      name: nextProps.name ? nextProps.name : "",
      description: nextProps.description ? nextProps.description.toString() : "",
      invalidated: false
    } );
  }

  reset = () => {
    this.setState( {
      name: this.props.name ? this.props.name : "",
      description: this.props.description ? this.props.description.toString() : "",
      invalidated: false
    } );
  }

  updateName = (name: string): void => { this.setState( { name: name, invalidated: true }) }
  updateDescription = (description: string): void => { this.setState( { description: description, invalidated: true } ) }

  submitPlace = (): void => {
    const newPlace = new Place( this.state.name, this.state.description );
    this.props.handleSubmitPlace( newPlace );
  }

  render() {
    return (
      <div>
        <img className="place-image" src="landscape-sketch.jpg" alt="character image"/>
        <div className="row">
          <div className="six columns">
            <label htmlFor="place-name">name</label>
            <input 
              onChange={ (e: React.ChangeEvent<HTMLInputElement>) => this.updateName(e.target.value) }
              className="u-full-width" type="text" placeholder="name" id="place-description" value={this.state.name} />
          </div>
          <div className="six columns">
          </div>
        </div>
        <label htmlFor="place-description">description</label>
        <textarea 
          type="text" placeholder="..." id="place-description" className="form-textarea" rows={10} value={this.state.description}
          onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => this.updateDescription(e.target.value) }
        />
    
        { this.state.invalidated && (
          <button 
            onClick={this.submitPlace}
            className="button-primary">
            {this.props.isNewPlace ? "add" : "update"}
            {IconUtils.buttonIcon("fa-check")}
          </button>) }

        { this.state.invalidated && (
          <button 
            onClick={this.reset}
            className="button-primary">
            discard
            {IconUtils.buttonIcon("fa-times")}
          </button>) }
      </div>
    );
  }
}
