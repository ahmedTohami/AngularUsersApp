import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../interfaces/User';
import { Post } from '../interfaces/Post';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFireDatabase, private userService: UserService) {
  }

  getUserPosts(user: User): Promise<Post[]> {
    let db = this.db
    return new Promise(resolve => {
      db.list('/users/' + user.id + '/posts/').valueChanges().subscribe(
        (posts: Post[]) => {
          resolve(posts as Post[])
        }
      )
    }
    )
  }

  deletePost(post: Post) {
    this.db.list('/users/' + post.owner.id + '/posts/').valueChanges().pipe(take(1)).subscribe(
      (posts: Post[]) => {
        for (let index = 0; index < posts.length; index++) {
          if (posts[index].id == post.id) {
            posts.splice(index, 1)
            break;
          }
        }
        this.db.object('/users/' + post.owner.id + '/posts/').set(posts)
        alert("deleted successfully reload page")
      },
      (error) => console.log(error)
    )
  }

  addPost(post: Post) {
    this.db.list('/users/' + post.owner.id + '/posts/').valueChanges().pipe(take(1)).subscribe(
      (posts: Post[]) => {
        posts.push(post)
        this.db.object('/users/' + post.owner.id + '/posts/').set(posts)
      },
      (error) => console.log(error)
    )
  }


  updatePost(post: Post) {
    this.db.list('/users/' + post.owner.id + '/posts/').valueChanges().subscribe(
      (posts: Post[]) => {
        for (let index = 0; index < posts.length; index++) {
          if (posts[index].id == post.id) {
            posts.splice(index, 1)
            break;
          }
        }
        posts.push(post)
        this.db.object('/users/' + post.owner.id + '/posts/').set(posts)
      },
      (error) => console.log(error)
    )
  }

  addUserPostLike(post: Post, userWhoLiked: User) {
    if (!post.peopleWhoLikesThis.includes(userWhoLiked.name)) {
      post.peopleWhoLikesThis.push(userWhoLiked.name)
      this.updatePost(post)
    }
    else {
      for (let index = 0; index < post.peopleWhoLikesThis.length; index++) {
        const element = post.peopleWhoLikesThis[index];
        if (post.peopleWhoLikesThis[index] == userWhoLiked.name) {
          post.peopleWhoLikesThis.splice(index, 1)
          break
        }
      }
      this.updatePost(post)
    }
  }


}
