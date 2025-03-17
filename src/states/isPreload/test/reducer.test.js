/**
* test scenario for isPreloadReducer
*
* - isPreloadReducer function
*  - should return the initial state when given by unknown action
*  - should set the isPreload when given by SET_IS_PRELOAD action
*
*/

import { describe, expect, it } from 'vitest';
import isPreloadReducer from '../reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = isPreloadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should set the isPreload when given by SET_IS_PRELOAD action', () => {
    // arrange
    const initialState = true;
    const action = {
      type: 'isPreload/set',
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.isPreload);
  });


});