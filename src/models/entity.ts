import { GUID } from 'utils/guidUtils';

export default interface Entity {
  name: string;
  thumbnail: string;
  description: string;

  id: string;

  readonly kind: string;
};
