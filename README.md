# AngularUsersApp

### Description
simple angular and firebase 8 app uses rxjs observales, async validators, template forms, reactive forms

### how to start 
1. download
2. open git bash or console of IDE of choice
3. install node modules   npm install
4. run ng s 
5. sign up or check what will happen if your not registerd
6. login try typing wrong email or password or both then try true
7. upload your profile picture
8. interact with others on platform putting like
9. make another account and send the previous frient request

### samples of content
#### interfaces
we use interfaces to strict type when dealing with observables here are used interfaces
1. FriendRequest
2. FriendRequestStatus
3. Post
4. PostOwner
5. User

#### async validators 
we use that to check email and password during sign up to be unique
```typescript
export class EmailExistValidator {

    static email(db: AngularFireDatabase) {
        return (control: AbstractControl) => {
            const _email = (control.value as string).toLowerCase()
            return db.list('/users', ref => ref.orderByChild('email').equalTo(_email))
                .valueChanges()  //get observable
                .pipe(
                    debounceTime(1000),//give hime 1 second to finish typing
                    take(1), //take first match
                    map(arr => arr.length ? { UserEmailAvailable: false } : null)  //if exist we found match
                )
        }
    }
}
```

#### services
we use service to manage crud operations with data and we inject it component constructor that needs it like userService and postService here

```typescript
  constructor(private router: Router, private ref: ElementRef, private userService: UserService, private postService: PostService) {
  }
```

#### router
we use router in app routing module to manage routing between different components

```typescript
const routes: Routes = [
  { path: 'posts', component: PostComponent },
  { path: 'userPosts/:name', component: PostComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent },
  { path: '', component: NavbarComponent },
  { path: 'Home', component: HomeComponent },
];
```
we also inject Router and ActivatedRoute to manage routing 
```typescript
 this.router.navigate(['Home'], {
      queryParams: {
        user: JSON.stringify(this.user)
      }
    })
```


#### input
we pass input from component to another using input like so

```typescript
 @Input('currentLoggedInUser') currentLoggedInUser: User
 @Input('post') post: Post
 
 in html 
 <app-post *ngFor="let post of posts" [post]="post" [currentLoggedInUser]="user" ></app-post>
 ```
 
 
 #### pipes
 we use pipes to manage display of data
```
   <h6>{{post.submitDate | date }}</h6>
```

#### reactive forms
reactive forms is used to give full control of user input to validate 

```typescript
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required], [NameExistValidator.username(this.db)]),
    email: new FormControl('', [Validators.required], [EmailExistValidator.email(this.db)]),
    password: new FormControl('', [Validators.required]),
  })
```
#### rxjs
we use rxjs to manage stream using observables

```typescript
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
```

```typescript
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
 ```
 
 #### firebase realtime database provides crud apis to use
 
 ```typescript
 
  getUser(id: string): Observable<User> {
    return this.db.object('/users/' + id).valueChanges() as Observable<User>
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
 ```
 
 



 
 
 

