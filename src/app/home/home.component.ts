import { Component, OnInit } from '@angular/core';
import {PostModal} from '../payload/PostModal';
import {PostService} from '../services/post.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {faComment, faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {PageablePostResponse} from '../payload/PageablePostResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUi: NgBlockUI;
  posts$: Array<PostModal> = [];
  pageablePost: PageablePostResponse;
  currentPage = 0;
  totalPage = 0;
  inflightRequest = true;
  searchTerm = '';
  constructor(private postService: PostService) {
    this.blockUi.start();
    this.postService.getAllPost(this.currentPage.toString(), this.searchTerm).subscribe( posts => {
        this.pageablePost = posts;
        this.totalPage = posts.totalPages;
        this.posts$ = posts.postResposnes;
        this.currentPage++;
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
      this.postService.getAllPost(this.currentPage.toString(), this.searchTerm).subscribe(posts => {
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
    this.postService.getAllPost(this.currentPage.toString(), this.searchTerm).subscribe( posts => {
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
