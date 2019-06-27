import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment';
import { UserPostComponent } from './components/user-post/user-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginService } from './services/login.service';
import { HomeComponent } from './components/home/home.component';
import { FriendRequestComponent } from './components/friend-request/friend-request.component';

import { EmojiModule } from 'angular-emoji/dist';
import { EmojiPickerComponent } from './components/emoji-picker/emoji-picker.component';

import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostComponent,
    PagenotfoundComponent,
    UserPostComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FriendRequestComponent,
    EmojiPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,          // for auth
    ReactiveFormsModule,
    EmojiModule,
    HttpClientModule
  ],
  providers: [
    LoginService,
    PostService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
