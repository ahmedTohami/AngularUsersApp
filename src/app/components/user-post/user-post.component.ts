import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { Guid } from 'guid-typescript';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from 'src/app/interfaces/User';
import { Promise } from 'q';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss']
})
export class UserPostComponent implements OnInit {

  constructor(private ref: ElementRef, private postService: PostService, private db: AngularFireDatabase) { }

  @Input('post') post: Post
  @Input('userid') userid: string

  likes: Element
  editModeEnabled: boolean
  deleteRequested: boolean

  ngOnInit() {
    this.editModeEnabled = false
    this.deleteRequested = false
  }


  hideLikes() {
    this.likes.classList.toggle('active')
  }

  showLikes() {
    this.likes = this.ref.nativeElement.querySelector('.likes')
    this.likes.classList.toggle('active')
  }

  edit() {
    this.editModeEnabled = true;
  }


  enableDelete() {
    this.deleteRequested = true;
  }


  

  disableDelete() {
    console.log('delete disabled ')
    this.deleteRequested = false;
  }

  delete() {
    console.log('deleted')
    this.disableDelete()
    this.postService.deletePost(this.post)
  }
 

  savePost(formValue) {
    console.log('post saved')
    console.log(formValue)
    this.editModeEnabled = false
    this.post.body = formValue.body
    this.postService.updatePost(this.post)
  }

}
