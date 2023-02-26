import { createAction, props } from '@ngrx/store';
import { TUser } from './auth.selector';

export const LOGOUT = '[Auth] Logout';

export const LOGIN = '[Auth] Login';

export const Login = createAction(
  LOGIN,
  props<{ userInfo: TUser; isAuthenticated: boolean }>()
);

export const Logout = createAction(LOGOUT);
