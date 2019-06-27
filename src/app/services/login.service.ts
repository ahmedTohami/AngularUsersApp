import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Guid } from 'guid-typescript';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router: Router, private db: AngularFireDatabase) {
    let email: string
    let password: string

  }

  login() {
    console.log('in')
    this.router.navigateByUrl('H')
  }

  validate(email: string, password: string) {
    let db = this.db
    return new Promise<User>(function (resolve, reject) {
      db.list('/users', ref => ref.orderByChild('email').equalTo(email)).valueChanges().subscribe(
        (users: User[]) => {
          const user: User = users[0]
          if (user) {
            let isPasswordCorrect = user.password == password

            if (isPasswordCorrect) {
              console.log('user is found ' + user)
              resolve(user)
            }
            else {
              alert('password is wrong ')

            }
          } else {
            alert('user with email not found ' + user)
            resolve(null)
          }
        },
        (error) => console.log(error),
        () => console.log('validation completed')
      )

    });

  }

  logout() {
    console.log('out')
  }
}
