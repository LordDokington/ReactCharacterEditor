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
              <label htmlFor="character-name">name</label>
              <input 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {} }
                className="u-full-width" type="text" placeholder="name" id="character-name" value={""} />
            </div>
            <div className="six columns">
            </div>
          </div>
      
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