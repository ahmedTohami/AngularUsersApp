import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmailExistValidator, NameExistValidator } from 'src/app/validators/uniqueness';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/User';
import { Guid } from 'guid-typescript';
import { Post } from "../../interfaces/Post";
import { PostOwner } from "../../interfaces/PostOwner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  userAdded: boolean
  user: User
  id: string

  constructor( private router:Router, private db: AngularFireDatabase, private userService: UserService) { }


  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required], [NameExistValidator.username(this.db)]),
    email: new FormControl('', [Validators.required], [EmailExistValidator.email(this.db)]),
    password: new FormControl('', [Validators.required]),
  })



  get name() {
    return this.signupForm.get('name')
  }
  get email() {
    return this.signupForm.get('email')
  }

  get password() {
    return this.signupForm.get('password')
  }

  onSubmit(signupFomrvalue) {

    let postId = (Guid.create() as any).value.toString()
    let userId = (Guid.create() as any).value.toString()
    this.id  =userId
    
    const firstPost: Post = {
      body: 'this is your first post',
      peopleWhoLikesThis: ['some one'],
      submitDate: new Date().toString(),
      title: 'your post title',
      id: postId,
      owner:{
        name:signupFomrvalue.name,
        id:userId
      },
    }

    this.user = {
      name: signupFomrvalue.name,
      password: signupFomrvalue.password,
      email: signupFomrvalue.email,
      posts: [firstPost],
      comingSentRequest: [{
        body: "please add me to your friends ",
        from: "someone else",
        to: "me",
        status: {
          rejected: false,
          accepted: false,
          pending: true
        },
        toId:"",
        fromId:"",
        submitDate: new Date().toString()
      }],
      sentFriendRequests: [{
        body: "please add me to your friends ",
        from: "me",
        to: "someone else",
        status: {
          rejected: false,
          accepted: false,
          pending: true
        },
        toId:"",
        fromId:"",  
        submitDate: new Date().toString()
      }],
      about: 'tell us a little about yourself.',
      id:userId,
      image: 'http://www.myseumoftoronto.com/wp-content/uploads/2018/12/face-placeholder.gif',
      subscribtionDate: new Date(2019, 11, 11).toString()
    }



    this.userService.add(this.user)
    this.userAdded = true
    




  }

  gotoHome() {
    this.router.navigate(['Home'], {
      queryParams: {
        user: JSON.stringify(this.user)
      }
    })
  }


  ngOnInit() {
  }

}
