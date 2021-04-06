import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {CreatePostComponent} from './create-post/create-post.component';
import {CreateSubjectComponent} from './create-subject/create-subject.component';
import {ListSubjectsComponent} from './list-subjects/list-subjects.component';
import {PostHomeComponent} from './post-home/post-home.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {AuthGuard} from './auth-guard/auth.guard';
import {SubjectHomeComponent} from './subject-home/subject-home.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'create-subject', component: CreateSubjectComponent, canActivate: [AuthGuard]},
  {path: 'list-subjects', component: ListSubjectsComponent, canActivate: [AuthGuard]},
  {path: 'view-post/:id', component: PostHomeComponent, canActivate : [AuthGuard] },
  {path: 'view-subject/:id', component: SubjectHomeComponent, canActivate : [AuthGuard]},
  {path: 'view-userprofile/:username', component: UserprofileComponent, canActivate: [AuthGuard]},
  {path: 'resetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
