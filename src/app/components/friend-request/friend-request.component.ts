import { Component, OnInit, Input } from '@angular/core';

import { FriendRequest } from 'src/app/interfaces/FriendRequest';
import { User } from 'src/app/interfaces/User';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { pipe } from 'rxjs';

@Component({
  selector: 'friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss']
})
export class FriendRequestComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  @Input("request") request: FriendRequest
  @Input("editModeEnable") editModeEnable: boolean


  acceptRequest() {
    console.log('request accepted')
    this.request.status.accepted = true
    this.request.status.rejected = false
    this.request.status.pending = false
    this.updateRequest()
  }

  updateRequest() {
    let db = this.db
    let request:  FriendRequest = this.request
    db.object('/users/'+this.request.fromId).valueChanges().pipe(take(1)).subscribe(
      (from: User) => {
        //==============================update arr in from user =======================
        from.sentFriendRequests = from.sentFriendRequests.filter(function (value, index, arr) {
          return value.to != request.to;
        });
        from.sentFriendRequests.push(request)

        db.object('/users/' + request.fromId + '/sentFriendRequests/').set(from.sentFriendRequests)
      },
      error => console.log(error)
    )

    //==============================update arr in to user =======================
    db.object('/users/'+request.toId).valueChanges().pipe(take(1)).subscribe(
      (to: User) => {

        to.comingSentRequest = to.comingSentRequest.filter(function (value, index, arr) {
          return value.from != request.from;
        });

        to.comingSentRequest.push(request)

        db.object('/users/' + request.toId + '/comingSentRequest/').set(to.comingSentRequest)
      },
      error => console.log(error)
    )
  }


  rejectRequest() {
    console.log('request rejected')
    this.request.status.accepted = false
    this.request.status.rejected = true
    this.request.status.pending = false
    this.updateRequest()
  }

  ngOnInit() {

  }


}
