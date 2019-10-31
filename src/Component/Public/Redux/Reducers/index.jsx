import {combineReducers} from 'redux';

import product from './product';
import auth from './auth';
import categories from './categories';

const appReducer = combineReducers ({
  product,
  auth,
  categories
});

export default appReducer;