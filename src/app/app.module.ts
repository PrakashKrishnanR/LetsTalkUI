import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './interceptors/tokenInterceptor';
import {BlockUIModule} from 'ng-block-ui';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatDividerModule} from '@angular/material/divider';
import { VoteComponent } from './shared/vote/vote.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SubtalkComponent } from './shared/subtalk/subtalk.component';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { CreateSubjectComponent } from './create-subject/create-subject.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './view-post/view-post.component';
import { PostHomeComponent } from './post-home/post-home.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatMenuModule} from '@angular/material/menu';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { SubjectHomeComponent } from './subject-home/subject-home.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { SearchComponent } from './shared/search/search.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    VoteComponent,
    SidebarComponent,
    SubtalkComponent,
    PostTileComponent,
    CreateSubjectComponent,
    CreatePostComponent,
    ListSubjectsComponent,
    ViewPostComponent,
    PostHomeComponent,
    UserprofileComponent,
    SubjectHomeComponent,
    SearchComponent,
    ConfirmationDialogComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    FontAwesomeModule,
    MatDividerModule,
    FlexLayoutModule,
    MatTableModule,
    MatListModule,
    EditorModule,
    MatExpansionModule,
    NgbModule,
    MatMenuModule,
    ScrollingModule,
    InfiniteScrollModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    } ,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
