import * as React from 'react';
import { buttonIcon } from '../../utils/iconUtils';
import * as FileUtils from '../../utils/fileUtils';
import { StoryEvent, Place, Character } from '../../models';
import { Portrait, Dropdown, TextInput } from '../../components';
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
      characters: props.charactersOfEvent.slice(),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      name: nextProps.name ? nextProps.name : '',
      description: nextProps.description ? nextProps.description.toString() : '',
      thumbnail: nextProps.thumbnail,
      invalidated: false,
      placeId: nextProps.placeId,
      characters: nextProps.charactersOfEvent.slice(),
    });
  }

  updateName = (name: string): void => this.setState({ name: name, invalidated: true });
  updateDescription = (description: string): void => this.setState({ description, invalidated: true });

  submitEvent = (): void => {
    // cannot create event without place
    // TODO: inform user that nothing is done and why
    const placeId = this.state.placeId;
    const newEvent = new StoryEvent(
      this.state.name,
      this.state.description,
      placeId,
      this.state.thumbnail,
      this.state.characters.map((c: Character) => c.id)
    );

    this.props.handleSubmitEvent(newEvent);
  };

  onDrop = (files: File[]) => {
    FileUtils.loadFileAsData(files[0], event => {
      this.setState({
        // tslint:disable-next-line:no-any
        thumbnail: (event.target as any).result,
        invalidated: true,
      });
    });
  };

  render() {
    const { isNew, places, placeId, toObjectView, handleAbort, availableCharacters } = this.props;
    const { thumbnail, name, description, invalidated, characters } = this.state;

    return (
      <div className="edit-view">
        <div className="edit-container">
          <Portrait image={thumbnail} placeholder="event.jpg" onDrop={this.onDrop} />
          <div className="editform-content">
            <div className="row">
              <div className="six columns">
                <TextInput
                  id="event-name"
                  placeholder="name"
                  label="name"
                  content={name}
                  onChange={(newContent: string) => this.updateName(newContent)}
                />
              </div>
              <div className="six columns">
                <Dropdown
                  label="select place"
                  index={places.findIndex((p: Place) => p.id === placeId)}
                  listElements={this.props.places.map(place => place.name)}
                  handleSelect={idx => {
                    this.setState({ placeId: places[idx].id, invalidated: true });
                  }}
                />
              </div>
            </div>

            <TextInput
              id="event-description"
              multiline={true}
              placeholder="..."
              label="description"
              content={description}
              onChange={(newContent: string) => this.updateDescription(newContent)}
            />
          </div>
        </div>
        <EventCharactersListEdit
          isNew={false /*TODO*/}
          charactersOfEvent={characters.slice()}
          selectableCharsAdd={availableCharacters}
          updateCharacterList={(characters: Character[]) => {
            this.setState({ characters, invalidated: true });
          }}
          toObjectView={toObjectView}
        />

        {invalidated && (
          <button onClick={this.submitEvent} className="button-primary">
            {isNew ? 'add' : 'update'} {buttonIcon('fa-check')}
          </button>
        )}
        {(isNew || invalidated) && (
          <button onClick={handleAbort} className="button-primary">
            discard {buttonIcon('fa-times')}
          </button>
        )}
      </div>
    );
  }
}
