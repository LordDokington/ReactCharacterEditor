import { GUID } from 'utils/guidUtils';
import Entity from './entity';

export default class Place implements Entity {
  constructor(name: string, description: string, thumbnailData: string) {
    this.id = GUID();
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnailData;

    // TODO: remove
    this.kind = 'Place';
  }

  name: string;
  thumbnail: string;
  description: string;

  id: string;

  readonly kind: string;
}

/*

export default interface Type extends Entity.Type {};

export const create: Type = (id?: string) => ({
  name: '',
  thumbnail: '',
  description: '',

  id: id || GUID(),

  kind: 'Place',
});

*/
