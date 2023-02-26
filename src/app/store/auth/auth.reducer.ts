import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.selector';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.Login, (state, { isAuthenticated, userInfo }) => ({
    isAuthenticated,
    userInfo,
  })),
  on(AuthActions.Logout, (state) => ({
    isAuthenticated: false,
    userInfo: null,
  }))
);
