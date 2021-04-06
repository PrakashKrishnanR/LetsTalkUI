import {EventEmitter, Injectable, Output} from '@angular/core';
import {SignUpRequestPayload} from '../payload/SignUpRequest';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginRequestPayload} from '../payload/LoginRequest';
import {LocalStorageService} from 'ngx-webstorage';
import {LoginResponsePayload} from '../login/LoginResponsePayload';
import {map, tap} from 'rxjs/operators';
import {LogoutPayload} from '../payload/LogoutPayload';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  base_url = 'http://localhost:9595/api/auth/';
  logoutPayload: LogoutPayload;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() username: EventEmitter<string> = new EventEmitter<string>();
  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
    this.logoutPayload = {
      refreshToken: '',
      username: ''
    };
  }

  signup(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post<SignUpRequestPayload>(this.base_url + 'signup', signUpRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>(this.base_url + 'login', loginRequestPayload)
      .pipe(map( data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('loggedInuser', data.loggedInUser)
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  getRole() {
    return this.localStorage.retrieve('role');
  }
  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    };

    return this.httpClient.post<LoginResponsePayload>(this.base_url + 'refresh/token', refreshTokenPayload)
      .pipe(tap( data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('expiresAt', data.expiresAt);
      }));
  }

  logout() {

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('username');
    this.localStorage.clear('loggedInuser');
    this.logoutPayload.refreshToken = this.getRefreshToken();
    this.logoutPayload.username = this.getUsername();
    this.httpClient.post<LogoutPayload>(this.base_url + 'logout', this.logoutPayload).subscribe(
      (data) => {
        console.log(data);
      }, error => {
        throwError(error);
      }
    );

  }
  public getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  public getLoggedInuser() {
    return this.localStorage.retrieve('loggedInuser');
  }

  public getUsername() {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn() {
    return this.getJwtToken() != null;
  }

  resetPassword(email: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('username', email);
    return this.httpClient.get<any>(this.base_url + 'resetPassword',
      {params: params});
  }
}
