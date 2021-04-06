import { Component, OnInit } from '@angular/core';
import {SignUpRequestPayload} from '../payload/SignUpRequest';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthServiceService} from '../services/auth-service.service';
import {LoginRequestPayload} from '../payload/LoginRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  loginrequestpayload: LoginRequestPayload;
  form: FormGroup;
  isError: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private router: Router,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.loginrequestpayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(7), Validators.required]],
    });

    // this.activatedRoute.queryParams.subscribe(params => {
    //   if ( params.registered !== undefined && params.registered === true) {
    //     this.toastrService.success('SignUp Successfull');
    //     // todo implement mail check message
    //   }
    // });
  }

  onSubmit() {
    this.blockUI.start('Logging in .....');
    this.loginrequestpayload.username = this.form.get('username').value;
    this.loginrequestpayload.password = this.form.get('password').value;

    this.authService.login(this.loginrequestpayload)
      .subscribe(data => {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastrService.success('Login Success !!');
        this.blockUI.stop();
      },
        err => {
            this.isError = true;
            this.toastrService.error(err.error.message);
            this.blockUI.stop();
        });
  }

  forgotPassword() {
    if (  isNullOrUndefined(this.form.get('username').value) || this.form.get('username').value === ''){
      this.toastrService.error('Please enter your Email-Id');
      return;
    }
    const username = this.form.get('username').value;
    this.authService.resetPassword(username)
      .subscribe(data => {
        this.toastrService.success('Password Reset Successful. Kindly Check Your Mail.');
      }, err => {
        this.toastrService.error(err.error.message);
      });
  }
}
