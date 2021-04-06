import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpRequestPayload} from '../payload/SignUpRequest';
import {AuthServiceService} from '../services/auth-service.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignUpRequestPayload;
  form: FormGroup;
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private toastrService: ToastrService,
              private router: Router) {
    this.signupRequestPayload = {
      password: '',
      email: ''
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.minLength(7), Validators.required]],
      emailId: ['', [Validators.email, Validators.required]],
    });
  }

  onSubmit() {
    this.signupRequestPayload.password = this.form.get('password').value;
    this.signupRequestPayload.email = this.form.get('emailId').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe( data => {
          this.toastrService.success('Please check the mail to complete registration !!');
          this.router.navigateByUrl('/login');
      },
        error => {
            this.toastrService.error(error.error.message);
        });
    }
}
