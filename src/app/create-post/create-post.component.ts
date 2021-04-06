import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TalkModal} from '../payload/TalkModal';
import {TalkserviceService} from '../services/talkservice.service';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {PostPayload} from '../payload/PostPayload';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {PostService} from '../services/post.service';
import {error} from 'util';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  form: FormGroup;
  postPayload: PostPayload;
  @BlockUI() blockUI: NgBlockUI;
  subtalk$: Array<TalkModal> = [];
  instructions: Array<string> = [
    'Please do follow the instructions',
    'Please do avoid Un-parlimentary words',
    'Please don\'t post sapm'
  ];
  constructor(private fb: FormBuilder,
              private talkservice: TalkserviceService,
              private router: Router,
              private postService: PostService) {

    this.postPayload = {
      description: '',
      postId: 0,
      postname: '',
      subtalkname: '',
      url: ''
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(4)]],
      description: ['', [Validators.minLength(7), Validators.required]],
      subtalk: ['', [Validators.required]],
      url: ['']
    });
    this.getAllSubtalks();
  }

  getAllSubtalks() {
    this.blockUI.start();
    this.talkservice.getAllTalks().subscribe( talks => {
        this.subtalk$ = talks;
        this.blockUI.stop();
      },
      error => {
        throwError(error);
        this.blockUI.stop();
      });
  }
  discard() {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    this.blockUI.start();
    this.postPayload.postname = this.form.get('title').value;
    this.postPayload.url = this.form.get('url').value;
    this.postPayload.description = this.form.get('description').value;
    this.postPayload.subtalkname = this.form.get('subtalk').value;

    this.postService.createPost(this.postPayload).subscribe(
      (data) => {
        this.blockUI.stop();
        this.router.navigateByUrl('/home');
      },
      () => {
        this.blockUI.stop();
        throwError(error);
      }
    );

  }

  resetForm() {
    this.form.reset();
  }

}
