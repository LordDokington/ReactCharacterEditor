import * as React from 'react';
import * as IconUtils from 'utils/iconUtils';
import * as FileUtils from 'utils/fileUtils';
import { Place } from 'models';
import { Portrait, TextInput } from 'components';

interface Props {
  name?: string;
  description?: string;
  thumbnail?: string;
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

    const { name, description, thumbnail } = this.props;

    this.state = {
      name: name || '',
      description: description ? description.toString() : '',
      thumbnail: thumbnail || '',
      invalidated: false,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { name, description, thumbnail } = nextProps;

    this.setState({
      name: name || '',
      description: description ? description.toString() : '',
      thumbnail: thumbnail || '',
      invalidated: false,
    });
  }

  updateName = (name: string): void => {
    this.setState({ name, invalidated: true });
  };
  updateDescription = (description: string): void => {
    this.setState({ description, invalidated: true });
  };

  submitPlace = (): void => {
    const { name, description, thumbnail } = this.state;
    const newPlace = new Place(name, description, thumbnail);
    this.props.handleSubmitPlace(newPlace);
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
    const { thumbnail, name, description, invalidated } = this.state;
    const { isNew } = this.props;

    return (
      <div className="edit-view">
        <div className="edit-container">
          <Portrait image={thumbnail} placeholder="landscape-sketch.jpg" onDrop={this.onDrop} />
          <div className="editform-content">
            <div className="row">
              <div className="six columns">
                <TextInput
                  id="place-name"
                  placeholder="name"
                  label="name"
                  content={name}
                  onChange={(newContent: string) => this.updateName(newContent)}
                />
              </div>
              <div className="six columns" />
            </div>
            <TextInput
              id="place-description"
              multiline={true}
              placeholder="..."
              label="description"
              content={description}
              onChange={(newContent: string) => this.updateDescription(newContent)}
            />
          </div>
        </div>

        {this.state.invalidated && (
          <button onClick={this.submitPlace} className="button-primary">
            {isNew ? 'add' : 'update'}
            {IconUtils.buttonIcon('fa-check')}
          </button>
        )}
        {(isNew || invalidated) && (
          <button onClick={this.props.handleAbort} className="button-primary">
            discard
            {IconUtils.buttonIcon('fa-times')}
          </button>
        )}
      </div>
    );
  }
}
