import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostModal} from '../payload/PostModal';
import {PostPayload} from '../payload/PostPayload';
import {PageablePostResponse} from '../payload/PageablePostResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  base_url = 'http://localhost:9595/api/';

  constructor(private httpClient: HttpClient) { }

  getAllPost( page: string, term: string): Observable<PageablePostResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', '10' );
    params = params.append('searchTerm', term);

    return this.httpClient.get<PageablePostResponse>(this.base_url + 'posts/',
      {params: params}
      );
  }

  createPost(postPayload: PostPayload): Observable<any> {
    return this.httpClient.post<PostPayload>(this.base_url + 'posts', postPayload);
  }

  getPostById(id: number): Observable<PostModal> {
    return this.httpClient.get<PostModal>(this.base_url + 'posts/' + id);
  }

  getPostByUser(username: string, page, searchTerm: string): Observable<PageablePostResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', '10' );
    params = params.append('username', username);
    params = params.append('searchTerm', searchTerm);
    return this.httpClient.get<PageablePostResponse>(this.base_url + 'posts/by-username'
    , {params: params});
  }

  getAllPostByTalkID(id: number, page: string, searchTerm: string): Observable<PageablePostResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', '10' );
    params = params.append('searchTerm', searchTerm);
    return this.httpClient.get<PageablePostResponse>(this.base_url + 'posts/byTalkid/' + id
    , {params: params});
  }

  deletePostByPostID(id: number): Observable<any> {
    return this.httpClient.delete<PostPayload> (this.base_url + 'posts/bypostid/' + id);

  }


}
