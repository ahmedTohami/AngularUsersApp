import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './components/post/post.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'posts', component: PostComponent },
  { path: 'userPosts/:name', component: PostComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: NavbarComponent },
  { path: 'Home', component: HomeComponent },
  // { path: '**', component: PagenotfoundComponent },
  // { path: '', component: NavbarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
