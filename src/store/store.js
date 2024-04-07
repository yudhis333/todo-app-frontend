import { configureStore } from '@reduxjs/toolkit';

import sideReducer from './reducers/sideLocation';
import searchRedcer from './reducers/search';
export const store = configureStore({
    reducer: {
        sidebar: sideReducer,
        search : searchRedcer
    },
  });
  
  export default store;