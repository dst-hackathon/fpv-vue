import axios from 'axios';
import * as types from './types';
import commitThrough from 'store/commit-through';

export default {

  ...commitThrough([
    types.SET_CURRENT_DESKCODE,
    types.SHOW_MODAL,
  ]),
};
