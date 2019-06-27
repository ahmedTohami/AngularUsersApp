import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { User } from "src/app/interfaces/User";
import * as firebase from 'firebase';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor( private postService:PostService ,  private userService: UserService, private route: ActivatedRoute) { }

  selectedFile: any

  successfullyUploaded: boolean

  @Input('user') user: User

  ngOnInit() {
    this.successfullyUploaded = false
  }


  addPost(newPostForm) {
    let newPostFormvalue = newPostForm.value
    console.log(newPostFormvalue)
    let id = (Guid.create() as any).value.toString()
    let post :Post = {
      title:newPostFormvalue.title,
      body:newPostFormvalue.body,
      id:id,
      peopleWhoLikesThis:[''],
      submitDate:new Date(2019,7,7).toString(),
      owner:{
        id:this.user.id,
        name:this.user.name
      }
    }
    this.user.posts.push(post)
    this.postService.addPost(post)
    newPostForm.reset()
    
  }

  uploadFile() {

    let storageRef = firebase.storage().ref('/usersImages/' + this.selectedFile.name)
    storageRef.put(this.selectedFile)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
      })

      .then(downloadURL => {
        console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
        this.user.image = downloadURL
        this.successfullyUploaded = true
        this.userService.updateUserImage(this.user.id, downloadURL)
        return downloadURL;
      })

      .catch(error => {
        console.log(`Failed to upload file and get link - ${error}`);
      });
  }

  fileChangeEvent($event) {
    this.selectedFile = $event.target.files[0]
  }

}
