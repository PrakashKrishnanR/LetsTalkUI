import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {VotePayload} from '../payload/VotePayload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  base_url = 'http://localhost:9595/api/vote';

  constructor(private httpClient: HttpClient) {
  }

  vote(votePayload: VotePayload): Observable<any> {
    return this.httpClient.post<VotePayload>(this.base_url, votePayload);
  }
}
