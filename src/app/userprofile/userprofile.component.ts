import { Component, OnInit } from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {PostModal} from '../payload/PostModal';
import {PostService} from '../services/post.service';
import {AuthServiceService} from '../services/auth-service.service';
import {PageablePostResponse} from '../payload/PageablePostResponse';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;
  posts$: Array<PostModal> = [];
  pageablePost: PageablePostResponse;
  currentPage = 0;
  totalPage = 1;
  inflightRequest = false;
  username: '';
  searchTerm: '';
  postCount: number;
  constructor(private postService: PostService,
              private authService: AuthServiceService) {
    this.blockUi.start();
    this.username = authService.getUsername();
    this.postService.getPostByUser(this.username, this.currentPage.toString(), '').subscribe( posts => {
        this.pageablePost = posts;
        this.posts$ = posts.postResposnes;
        this.postCount = posts.postResposnes.length;
        this.inflightRequest = false;
        this.blockUi.stop();
      },
      () => {
        this.blockUi.stop();
      });
  }

  ngOnInit(): void {
  }

  onScroll() {
    if (this.currentPage < this.totalPage && !this.inflightRequest) {
      this.inflightRequest = true;
      this.postService.getPostByUser(this.username, this.currentPage.toString(), this.searchTerm).subscribe(posts => {
          this.pageablePost = posts;
          this.totalPage = posts.totalPages;
          this.currentPage++;
          this.inflightRequest = false;
          this.posts$ = [ ...this.posts$, ...posts.postResposnes];
        },
        () => {
        });
    }
  }

  movetoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  startSearch(keyword: any) {
    this.currentPage = 0;
    this.searchTerm = keyword;
    this.postService.getPostByUser(this.username, this.currentPage.toString(), this.searchTerm).subscribe( posts => {
        this.pageablePost = posts;
        this.totalPage = posts.totalPages;
        this.posts$ = posts.postResposnes;
        this.currentPage++;
        this.inflightRequest = false;
      },
      () => {
      });
  }
}

