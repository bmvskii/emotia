import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { UserInfo } from 'src/app/services/auth.service';

export type TUser = UserInfo | null;

export interface State {
  isAuthenticated: boolean;
  userInfo: TUser;
}

export const initialState: State = {
  isAuthenticated: false,
  userInfo: null,
};

export const selectAuthFeature = (state: AppState) => state.auth;

export const selectAuthStatus = createSelector(
  selectAuthFeature,
  (state: State): boolean => state.isAuthenticated
);

export const selectUserInfo = createSelector(
  selectAuthFeature,
  (state: State): TUser => state.userInfo
);
