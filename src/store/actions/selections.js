import * as types from 'store/types';
import commitThrough from 'store/commit-through';

export default {
  ...commitThrough([
    types.SELECT_PLAN,
    types.SELECT_BUILDING,
    types.SELECT_FLOOR,
  ])
};
