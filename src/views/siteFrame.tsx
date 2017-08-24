import * as React from "react";
import * as ReactDOM from "react-dom";

import CharacterView from './characterView/characterView';
import TimelineView from './timelineView/timelineView';
import PlacesView from './placesView/placesView';
import { Character } from "../models/character";

const views = {
  Characters: 0,
  Places: 1,
  Events: 2,
  Timeline: 3
};

interface SiteFrameProps {
  characters: Character[];
}

interface SiteFrameState {
  view: number;
}

const getView = (view: number) => ({ characters }: SiteFrameProps ): JSX.Element =>
{
  switch(view)
  {
    case views.Characters: return <CharacterView characters={characters} /> ;
    case views.Places: return <PlacesView /> ;
    case views.Events: return <TimelineView /> ;
    case views.Timeline: return <TimelineView /> ;
  }

  return <div></div>;
}

export default class SiteFrame extends React.Component<any, SiteFrameState> {
  constructor() {
    super();

    this.state = {
      view: views.Characters
    }
  }

  render() {
    return (
    <div id="main">
      <div id="nav-bar">
        <ul>
          { Object.keys(views).map( (key) => (
              <li
                key={"nav_" + views[key]}
                onClick={() => this.setState({ view: views[key] })}
                className={ this.state.view == views[key] ? "active-item" : ""}
              >{key}</li> ) ) }
        </ul>
      </div>
      { getView(this.state.view)(this.props) }

      <div id="footer">TODO: Footer</div>
    </div>
    )
  }
}