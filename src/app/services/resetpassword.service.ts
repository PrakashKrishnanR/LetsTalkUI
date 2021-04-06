import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ResetPasswordPayload} from '../payload/ResetPasswordPayload';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  base_url = 'http://localhost:9595/api/';
  constructor(private httpClient: HttpClient) { }

  resetPassword(resetPasswordPayload: ResetPasswordPayload): Observable<any> {
    return this.httpClient.post<ResetPasswordPayload>(this.base_url + 'changePassowrd', resetPasswordPayload );
  }

}
