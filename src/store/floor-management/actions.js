import * as types from './types';
import commitThrough from 'store/commit-through';

export default {
  ...commitThrough([
    types.SELECT_DESK,
    types.DESELECT_DESK
  ])
};
