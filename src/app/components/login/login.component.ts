import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: User
  id: String

  constructor(private loginService: LoginService, private router: Router) { }

  loggedin: boolean

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


  gotoHome() {
    this.router.navigate(['Home'], {
      queryParams: {
        user: JSON.stringify(this.user)
      }
    })
  }


  get name() {
    return this.loginForm.get('name').value
  }
  get email() {
    return this.loginForm.get('email').value
  }

  get password() {
    return this.loginForm.get('password').value
  }

  ngOnInit() {
  }

  onSubmit(loginFormValue) {
    this.loginService.validate(this.email, this.password).then(
      (user: User) => {
        if (user) {
          this.loggedin = true
          this.user = user
          this.id = user.id
        }
        else {
          alert('not user yet sign up first')
          this.router.navigateByUrl('/signup')
        }
      }
    )
  }

}
