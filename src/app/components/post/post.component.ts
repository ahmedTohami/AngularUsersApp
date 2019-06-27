import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';
import { User } from 'src/app/interfaces/User';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private router: Router, private ref: ElementRef, private userService: UserService, private postService: PostService) {
  }


  @Input('currentLoggedInUser') currentLoggedInUser: User
  @Input('post') post: Post

  likes: Element

  ngOnInit() {
    
  }



  hideLikes() {
    this.likes.classList.toggle('active')
  }

  showLikes() {
    this.likes = this.ref.nativeElement.querySelector('.likes')
    this.likes.classList.toggle('active')
  }

  sendFriendRequest() {
    console.log("hi")
    if (!this.currentLoggedInUser) this.router.navigate(['login'])
    else {
      this.userService.sendRequest(this.currentLoggedInUser, this.post.owner.id)
    }
  }


  like() {
    if (!this.currentLoggedInUser) this.router.navigate(['login'])
    else {
      this.postService.addUserPostLike(this.post, this.currentLoggedInUser)
    }
  }


}
