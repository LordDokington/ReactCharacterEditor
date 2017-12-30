import { GUID } from 'utils/guidUtils';
//import { StoryEvent } from ".";

export default class Place {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;

    // TODO: remove
    this.kind = 'Place';
  }

  /*
  addEvent(event: StoryEvent) {
    event.setPlace(this);
  }
  */

  id: string;
  name: string;
  description: string;
  //thumbnail as data string
  thumbnail: string;

  readonly kind: string = 'Place';
}
