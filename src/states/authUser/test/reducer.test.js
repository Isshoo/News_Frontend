/**
* test scenario for authUserReducer
*
* - authUserReducer function
*  - should return the initial state when given by unknown action
*  - should set the authUser when given by SET_AUTH_USER action
*  - should unset the authUser when given by UNSET_AUTH_USER action
*
*/

import { describe, expect, it } from 'vitest';
import authUserReducer from '../reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should set the authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'authUser/set',
      payload: {
        authUser: {
          'id': 'john_doe',
          'name': 'John Doe',
          'email': 'john@example.com',
          'avatar': 'https://generated-image-url.jpg'
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should unset the authUser when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      'id': 'john_doe',
      'name': 'John Doe',
      'email': 'john@example.com',
      'avatar': 'https://generated-image-url.jpg'
    };
    const action = {
      type: 'authUser/unset',
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });


});