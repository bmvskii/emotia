import { createAction, props } from '@ngrx/store';

export const LOGOUT = '[Auth] Logout';

export const LOGIN = '[Auth] Logout';

export const Login = createAction(LOGIN);

export const Logout = createAction(LOGOUT);
