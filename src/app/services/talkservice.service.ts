import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TalkModal} from '../payload/TalkModal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalkserviceService {

  base_url = 'http://localhost:9595/api/';

  constructor(private httpClient: HttpClient) {

  }

  getAllTalks(): Observable<Array<TalkModal>> {
    return this.httpClient.get<Array<TalkModal>>(this.base_url + 'subtalk');
  }

  createNewTalk(talkModal: TalkModal): Observable<TalkModal> {
    return this.httpClient.post<TalkModal>(this.base_url + 'subtalk', talkModal );
  }

  deleteSubject(subid: number): Observable<any> {
    return this.httpClient.delete(this.base_url + 'subtalk/deleteBySubId/' + subid);
  }
}
