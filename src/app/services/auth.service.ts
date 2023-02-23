import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { Router, ActivatedRoute } from '@angular/router';

type UserInfo = firebase.default.auth.AdditionalUserInfo;
type Credentials = firebase.default.auth.AuthCredential & {
  accessToken: string;
  idToken: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: any = null;
  isAuthenticated = false;
  userId: string = '';

  token = '';
  accessToken = '';

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkAuthenticationStatus();
  }

  checkAuthenticationStatus() {
    const accessToken = localStorage.getItem('access_token');
    const userInfo = JSON.parse(localStorage.getItem('userData') || 'null');

    if (accessToken) {
      this.isAuthenticated = true;
      this.setToken(accessToken);
      this.setUserData(userInfo);
    }
  }

  async signIn() {
    if (this.isAuthenticated) {
      return;
    }

    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const { credential, additionalUserInfo } =
      await this.afAuth.signInWithPopup(googleAuthProvider);

    this.setUserData(additionalUserInfo as UserInfo);
    this.setToken((credential as Credentials)?.accessToken);
    await this.setUserId();

    this.isAuthenticated = true;
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
    return userData ? userData : this.user;
  }

  setUserData(data: UserInfo) {
    this.user = data;
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
    this.isAuthenticated = false;
    this.router.navigate(['/auth'], { relativeTo: this.route });
  }

  async getUser() {
    return this.user;
  }
}
