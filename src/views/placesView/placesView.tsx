import * as React from "react";   
import * as IconUtils from "../../utils/iconUtils";

export default class PlacesView extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      invalidated: false
    }
  }

  render(): JSX.Element{
      return (
        <div className="container" >
          <img className="place-image" src="landscape-sketch.jpg" alt="character image"/>
          <div className="row">
            <div className="six columns">
              <label htmlFor="place-name">name</label>
              <input 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {} }
                className="u-full-width" type="text" placeholder="name" id="place-description" value={""} />
            </div>
            <div className="six columns">
            </div>
          </div>
          <label htmlFor="character-name">description</label>
          <textarea type="text" placeholder="..." id="place-description" className="form-textarea" rows={10}></textarea>
      
          { this.state.invalidated && (
            <button 
              onClick={() => {}}
              className="button-primary">
              {this.props.isNewCharacter ? "add" : "update"}
              {IconUtils.buttonIcon("fa-check")}
            </button>) }
  
          { this.state.invalidated && (
            <button 
              style={{ marginLeft: "0.4em" }}
              onClick={() => {}}
              className="button-primary">
              discard
              {IconUtils.buttonIcon("fa-times")}
            </button>) }
        </div>
      );
    }
}