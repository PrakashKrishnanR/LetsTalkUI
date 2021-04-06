import { Component, OnInit } from '@angular/core';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {PostModal} from '../payload/PostModal';
import {PostService} from '../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {PageablePostResponse} from '../payload/PageablePostResponse';

@Component({
  selector: 'app-subject-home',
  templateUrl: './subject-home.component.html',
  styleUrls: ['./subject-home.component.css']
})
export class SubjectHomeComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;
  postId: number;
  posts$: Array<PostModal> = [];
  pageablePost: PageablePostResponse;
  currentPage = 0;
  totalPage = 1;
  inflightRequest = false;
  searchTerm = '';
  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.blockUi.start();
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.postService.getAllPostByTalkID(this.postId, this.currentPage.toString(), '').subscribe( posts => {
        this.pageablePost = posts;
        this.posts$ = posts.postResposnes;
        this.currentPage++;
        this.inflightRequest = false;
        this.totalPage = posts.totalPages;
        this.blockUi.stop();
      },
      () => {
        this.blockUi.stop();
      });
  }

  onScroll() {
    if (this.currentPage < this.totalPage && !this.inflightRequest) {
      this.inflightRequest = true;
      this.postService.getAllPostByTalkID(this.postId, this.currentPage.toString(), this.searchTerm).subscribe(posts => {
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
    this.postService.getAllPostByTalkID(this.postId, this.currentPage.toString(), this.searchTerm).subscribe( posts => {
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

