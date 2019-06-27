import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/interfaces/Post';
import { User } from 'src/app/interfaces/User';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postService: PostService, private userService: UserService) { }


  user: User

  ngOnInit() {
    //get user from url 
    this.route.queryParams.subscribe(
      (params) => {
        try {
          this.user = JSON.parse(params.user) as User
        } catch (error) {
          console.log("failed to get user from url "+error)
        }
      }
    )
    
    this.getAllPosts()
  }


  posts: Post[] = []

  async getAllPosts() {
    let users: User[] = <User[]>await this.userService.getAllUsers()
    for (const user of users) {
      let user_posts: Post[] = <Post[]>await this.postService.getUserPosts(user)
      this.posts = this.posts.concat(user_posts)
    }
  }

}
