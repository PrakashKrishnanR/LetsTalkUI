import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentPayload} from '../payload/CommentPayload';
import {PostComments} from '../payload/PostComments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  base_url = 'http://localhost:9595/api/comments';

  constructor(private httpClient: HttpClient) { }

  getCommentsBypostId(id: number): Observable<Array<CommentPayload>> {
    return this.httpClient.get<Array<CommentPayload>>(this.base_url + '/byPost/' + id);
  }

  postCommentService(commentPayload: PostComments): Observable<any> {
    return this.httpClient.post<PostComments>(this.base_url, commentPayload );
  }

  deleteCommentService(commentId: number): Observable<any> {
    return this.httpClient.delete<PostComments>(this.base_url + '/deleteById/' + commentId  );
  }
}
