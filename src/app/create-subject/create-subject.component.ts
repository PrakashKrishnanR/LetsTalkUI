import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {TalkserviceService} from '../services/talkservice.service';
import {TalkModal} from '../payload/TalkModal';
import {throwError} from 'rxjs';
import {error} from 'util';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  form: FormGroup;
  talkmodal: TalkModal;
  instructions: Array<string> = [
    'Please do follow the instructions',
    'Please do avoid Un-parlimentary words',
    'Please don\'t post sapm'
  ];
  constructor(private fb: FormBuilder,
              private talkservice: TalkserviceService,
              private toasterService: ToastrService,
              private router: Router) {

    this.talkmodal = {
      name: '',
      id: 0,
      noOfPosts: 0,
      description: '',
      deleteEnabled: false
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(4)]],
      description: ['', [Validators.minLength(7), Validators.required, Validators.maxLength(255)]],
    });
  }

  discard() {
    this.router.navigateByUrl('/');
  }

  onSubmit() {
    this.talkmodal.name = this.form.get('title').value;
    this.talkmodal.description = this.form.get('description').value;


    this.talkservice.createNewTalk(this.talkmodal).subscribe(
      (data) => {
        this.router.navigateByUrl('/list-subjects');
      }, (err) => {
        this.toasterService.error(err.error.message);
    });
  }

  resetForm() {
    this.form.reset();
  }
}
