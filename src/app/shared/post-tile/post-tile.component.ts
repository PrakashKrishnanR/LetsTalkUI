import {Component, Input, OnInit} from '@angular/core';
import {PostModal} from '../../payload/PostModal';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {faComment} from '@fortawesome/free-solid-svg-icons';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts$: Array<PostModal> = [];
  @Input() inFlightRequest: boolean;
  @BlockUI() blockUi: NgBlockUI;
  faComment = faComment;

  constructor(private postService: PostService, private router: Router) {

  }

  ngOnInit(): void {
  }

  gotoPost(postId: 0) {
    this.router.navigateByUrl('/view-post/' + postId);
  }
}
