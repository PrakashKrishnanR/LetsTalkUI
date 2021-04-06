import {Component, Input, OnInit} from '@angular/core';
import {PostModal} from '../../payload/PostModal';
import {faThumbsDown, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {VoteService} from '../../services/vote.service';
import {AuthServiceService} from '../../services/auth-service.service';
import {PostService} from '../../services/post.service';
import {ToastrService} from 'ngx-toastr';
import {VotePayload} from '../../payload/VotePayload';
import {VoteType} from '../../payload/VoteType';
import {throwError} from 'rxjs';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  @Input() post: PostModal;
  @BlockUI() blockUI: NgBlockUI;
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;
  votePayload: VotePayload;
  isloggedIn: boolean;

  constructor(private voteService: VoteService,
              private authService: AuthServiceService,
              private postService: PostService,
              private toastrService: ToastrService) {
    this.votePayload = {
      postId: undefined,
      voteType: undefined
    };
    if (this.authService.isLoggedIn()) {
      this.isloggedIn = true;
    } else {
      this.isloggedIn = false;
    }
  }

  ngOnInit(): void {
  }

  upVote() {
    if ( this.logInCheck()) {
      this.votePayload.voteType = VoteType.UPVOTE;
      this.vote();
    }
  }

  downVote() {
    if (this.logInCheck()) {
      this.votePayload.voteType = VoteType.DOWNVOTE;
      this.vote();
    }
  }

  vote() {
    this.votePayload.postId = this.post.postId;
    this.voteService.vote(this.votePayload).subscribe(
      (data) => {
        this.updateVoteDetails();
      }, error => {
        this.toastrService.error(error.error.message);
        throwError(error);
      }
    );
  }

   updateVoteDetails() {
    this.postService.getPostById(this.post.postId).subscribe(
      (data) => {
        this.post = data;
      }
    );
  }
  logInCheck() {
    if (! this.authService.isLoggedIn()) {
      this.toastrService.error('Please Login to Vote');
      return false;
    }
    return true;
  }
}
