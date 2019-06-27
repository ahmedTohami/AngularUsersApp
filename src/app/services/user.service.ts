import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { Guid } from "guid-typescript";
import { FriendRequest } from '../interfaces/FriendRequest';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getAllUsers(): Promise<User[]> {
    let db = this.db
    return new Promise(resolve =>
      db.list('/users').valueChanges().subscribe(
        (users: User[]) => {
          resolve(users as User[])
        }
      )
    )
  }



  getUser(id: string): Observable<User> {
    return this.db.object('/users/' + id).valueChanges() as Observable<User>
  }


  getAll() {
    return this.db.list('/users').valueChanges();
  }


  updateUserImage(id: string, downloadUrl: string) {
    const key = '/users/' + id + '/image'
    console.log(key)
    this.db.object(key).set(downloadUrl)
  }
  add(user: User) {
    if (user)
      this.db.object('/users/' + user.id).set(user)
    console.log('user added successfully')
  }

  delete(id: string) {
    this.db.object('/users/' + id).remove()
    console.log('user deleted')
  }

  update(id: string, user: User) {
    this.db.object('/users/' + id).update(user)
  }

  sendRequest(from: User, to: string) {
    let db = this.db
    this.db.object('/users/' + to).valueChanges().pipe(take(1)).subscribe(
      (to: User) => {
        //user already sent request
        if (to.comingSentRequest.map(c=>c.from).includes(from.name)) {
          alert("you already sent request")
        }//user got request from person he is willing to add
        else if(from.comingSentRequest.map(c=>c.from).includes(to.name)){
          alert("he sent request for you")
        }
        else {
          let request: FriendRequest = {
            from: from.name,
            to: to.name,
            toId:to.id,
            fromId:from.id,
            submitDate: new Date(22, 6, 2019).toString(),
            body: "kindly add me to your friends ",
            status: {
              accepted: false,
              rejected: false,
              pending: true
            }
          }


        db.list('/users/' + to.id + '/comingSentRequest/').valueChanges().pipe(take(1))
        .subscribe(
            (comingRequests:FriendRequest[])=>{
              comingRequests.push(request)
              db.object('/users/' + to.id + '/comingSentRequest/').set(comingRequests)
            },
            (error)=>console.log(error)
          )

          db.list('/users/' + from.id + '/sentFriendRequests/').valueChanges().pipe(take(1))
          .subscribe(
            (sentRequests:FriendRequest[])=>{
              sentRequests.push(request)
              db.object('/users/' + from.id + '/sentFriendRequests/').set(sentRequests)
            },
            (error)=>console.log(error)
          )

          alert("request sent")
        }

      }
    )
  }

}
