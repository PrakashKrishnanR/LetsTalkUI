import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {TooltipPosition} from '@angular/material/tooltip';
import {ResetPasswordPayload} from '../payload/ResetPasswordPayload';
import {ResetpasswordService} from '../services/resetpassword.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  mismatch: boolean;
  form: FormGroup;
  resetPasswordPayload: ResetPasswordPayload;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  samepassword: any;
  constructor(private fb: FormBuilder,
              private toasterService: ToastrService,
              private routerService: Router,
              private resetPasswordService: ResetpasswordService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', [Validators.minLength(7), Validators.required]],
      confirmpassword: ['', [Validators.minLength(7), Validators.required]],
    });

    this.resetPasswordPayload = {
      oldPassword : '',
      newPassword : ''
    };
  }

  onSubmit() {
    this.mismatch = false;
    this.samepassword = false;
    console.log(this.form);
    if ( this.form.get('newpassword').value !== this.form.get('confirmpassword').value  ) {
      this.mismatch = true;
      return;
    }
    if ( this.form.get('oldpassword').value === this.form.get('newpassword').value ) {
      this.samepassword = true;
      return;
    }
    this.resetPasswordPayload.oldPassword = this.form.get('oldpassword').value;
    this.resetPasswordPayload.newPassword = this.form.get('newpassword').value;

    this.resetPasswordService.resetPassword(this.resetPasswordPayload).subscribe(
      data => {
        this.toasterService.success('Password reset Successful');
        this.routerService.navigateByUrl('/home');
      }, err => {
        this.toasterService.error(err.error.message);
      }
    );
  }
}
