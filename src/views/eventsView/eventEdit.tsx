import * as React from 'react';
import * as IconUtils from "../../utils/iconUtils";
import * as FileUtils from "../../utils/fileUtils";
import { StoryEvent, Place, Character } from "../../models";
import { Portrait, Dropdown } from "../../components";
import EventCharactersListEdit from './eventCharactersListEdit';

interface Props {
  name?: string;
  description?: string;
  thumbnail: string;
  places: Place[];
  charactersOfEvent: Character[];
  availableCharacters: Character[];
  isNew?: boolean;
  placeId: string;
  handleSubmitEvent: (event: StoryEvent) => void;
  handleAbort: () => void;
  toObjectView: (o: any) => void;
}


interface State {
  name: string;
  description: string;
  invalidated: boolean;
  thumbnail: string;
  placeId: string;
  characters: Character[];
}

export default class EventEdit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: props.name ? props.name : '',
      description: props.description ? props.description.toString() : '',
      thumbnail: props.thumbnail,
      invalidated: false,
      placeId: props.placeId,
      characters: props.charactersOfEvent.slice()
    };
  }

  componentWillReceiveProps(nextProps: Props) {

    this.setState ( {
      name: nextProps.name ? nextProps.name : '',
      description: nextProps.description ? nextProps.description.toString() : '',
      thumbnail: nextProps.thumbnail,
      invalidated: false,
      placeId: nextProps.placeId,
      characters: nextProps.charactersOfEvent.slice()
    } );
  }

  updateName = (name: string): void => this.setState({ name: name, invalidated: true });
  updateDescription = (description: string): void => this.setState({ description: description, invalidated: true });

  submitEvent = (): void => {
    // cannot create event without place
    // TODO: inform user that nothing is done and why
    const placeId = this.state.placeId;
    const newEvent = new StoryEvent( this.state.name, 
                                     this.state.description, 
                                     placeId,
                                     this.state.thumbnail,
                                     this.state.characters.map((c: Character) => c.id)
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
    const places = this.props.places;
    const placeId = this.state.placeId;

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
            <Dropdown
              label="select place"
              index={places.findIndex( (p: Place) => p.id === placeId )}
              listElements={this.props.places.map( place => place.name )}
              handleSelect={(idx) => {
                this.setState( {placeId: places[idx].id, invalidated: true} );
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
        <EventCharactersListEdit
          isNew={false /*TODO*/}
          charactersOfEvent={this.state.characters}
          selectableCharsAdd={this.props.availableCharacters}
          handleAppendCharacter={(char: Character) => { 
            const characters = this.state.characters.slice();
            characters.push( char );
            this.setState( { characters, invalidated: true } );
           }}
          handleRemoveCharacter={(char: Character) => { 
            const characters = this.state.characters.filter( c => c.id !== char.id);
            this.setState( { characters, invalidated: true } );
           }}
          toObjectView={this.props.toObjectView}
         />
    
        
        {this.state.invalidated && (
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
