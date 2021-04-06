import {Component, Input, OnInit} from '@angular/core';
import {PostModal} from '../payload/PostModal';
import { Location } from '@angular/common';
import {CommentPayload} from '../payload/CommentPayload';
import {AuthServiceService} from '../services/auth-service.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import {PostService} from '../services/post.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {CommentService} from '../services/comment.service';
import {PostComments} from '../payload/PostComments';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationMessage} from '../payload/ConfirmationMessage';
import {ConfirmationDialogComponent} from '../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  commentPayload: PostComments;
  form: FormGroup;
  post: PostModal;
  comments$: Array<CommentPayload> = [];
  @Input() postId = 0;
  @BlockUI() blockUI: NgBlockUI;
  commentDeleteConfirmation: ConfirmationMessage;
  postDeleteConfirmation: ConfirmationMessage;

  constructor(private authService: AuthServiceService,
              private fb: FormBuilder,
              private toasterService: ToastrService,
              private location: Location,
              private postService: PostService,
              private dialog: MatDialog,
              private commentService: CommentService) {

  }

  ngOnInit(): void {
    this.commentDeleteConfirmation = {
      title : 'Are you sure want to Delete the Comment?',
      message : 'This action will remove the comment permanently!! '
    };
    this.postDeleteConfirmation = {
      title : 'Are you sure want to Delete the Post?',
      message : 'Deleting the Post will delete all the associated comments and votes'
    };
    this.getPostandComments();
    this.getComments();
    this.form = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.commentPayload = {
      postId: 0,
      text: '',
      username: '',
    };
  }

  getPostandComments() {
    this.blockUI.start();
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.post = data;
        this.blockUI.stop();
      },
      err => {
        throwError(err);
        this.blockUI.stop();
      }
    );
  }

  getComments() {
    this.commentService.getCommentsBypostId(this.postId).subscribe(
      (data) => {
        this.comments$ = data;
      },
      error1 => {
        throwError(error1);
      }
    );
  }
  onSubmit() {
      this.commentPayload.username = this.authService.getUsername();
      this.commentPayload.text = this.form.get('comment').value;
      this.commentPayload.postId = this.post.postId;

      this.blockUI.start();
      this.commentService.postCommentService(this.commentPayload).subscribe(
        () => {
            this.blockUI.stop();
            this.form.reset();
            this.getComments();
        },
        err => {
          throwError(err);
          this.blockUI.stop();
        }
      );
  }

  deleteComment(comment: CommentPayload) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: this.commentDeleteConfirmation,
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.commentService.deleteCommentService(comment.id)
          .subscribe(
            data => {
              this.getComments();
            }, err => {
              this.toasterService.error(err.error.message);
            }
          );
      }
    });
  }

  deletePost(post: PostModal) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '50%',
      data: this.postDeleteConfirmation,
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.postService.deletePostByPostID(post.postId)
          .subscribe(
            data => {
              this.location.back();
            }, err => {
              this.toasterService.error(err.error.message);
            }
          );
      }
      });
  }
}
