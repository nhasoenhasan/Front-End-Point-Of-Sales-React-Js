import {combineReducers} from 'redux';

import product from './product';
import auth from './auth';

const appReducer = combineReducers ({
  product,
  auth
});

export default appReducer;