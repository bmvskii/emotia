import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { ClearReactions } from '../store/reactions-timeline/reactions-timeline.actions';
import { Login, Logout } from '../store/auth/auth.actions';
import {
  selectAuthStatus,
  selectUserInfo,
  TUser,
} from '../store/auth/auth.selector';

export type UserInfo = firebase.default.auth.AdditionalUserInfo & {
  profile: any;
};
type Credentials = firebase.default.auth.AuthCredential & {
  accessToken: string;
  idToken: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  userId: string = '';
  accessToken = '';
  isAuthenticated = false;
  userInfo: TUser = null;

  isAuthenticated$ = this.store.pipe(select(selectAuthStatus));
  userInfo$ = this.store.pipe(select(selectUserInfo));

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.checkAuthenticationStatus();
    this.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
    this.userInfo$.subscribe((info) => {
      this.userInfo = info;
    });
  }

  checkAuthenticationStatus() {
    const accessToken = localStorage.getItem('access_token');
    const userInfo = JSON.parse(localStorage.getItem('userData') || 'null');

    if (accessToken) {
      this.store.dispatch(Login({ isAuthenticated: true, userInfo }));
      this.setToken(accessToken);
    }
  }

  async signIn() {
    if (this.isAuthenticated) {
      return;
    }

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const { credential, additionalUserInfo: userInfo } =
      await this.afAuth.signInWithPopup(googleAuthProvider);

    this.saveUserDataToLocalStorage(userInfo as UserInfo);
    this.setToken((credential as Credentials)?.accessToken);
    await this.setUserId();

    this.store.dispatch(
      Login({ isAuthenticated: true, userInfo: userInfo as TUser })
    );
  }

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('access_token', this.accessToken);
  }

  async setUserId() {
    const user = await this.afAuth.currentUser;
    this.userId = user!.uid;
    localStorage.setItem('userId', this.userId);
  }

  getUserId() {
    const userId = localStorage.getItem('userId') || null;
    return userId ? userId : this.userId;
  }

  getToken() {
    return this.accessToken;
  }

  getUserData() {
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');
    return userData ? userData : this.userInfo;
  }

  saveUserDataToLocalStorage(data: UserInfo) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  removeLocalStorageData() {
    localStorage.removeItem('userId');
    localStorage.removeItem('access_token');
    localStorage.removeItem('userData');
  }

  async signOut() {
    await this.afAuth.signOut();
    this.removeLocalStorageData();
    this.store.dispatch(ClearReactions());
    this.store.dispatch(Logout());
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }
}
