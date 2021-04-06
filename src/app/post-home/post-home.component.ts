import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service';
import {PostModal} from '../payload/PostModal';
import {throwError} from 'rxjs';
import {error} from 'util';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-post-home',
  templateUrl: './post-home.component.html',
  styleUrls: ['./post-home.component.css']
})
export class PostHomeComponent implements OnInit {

  postId: number;

  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService) {
    this.postId = this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {

  }

}
