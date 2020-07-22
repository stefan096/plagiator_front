import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'app/model/user/userLogin';
import { User } from 'app/model/user/user';
import { AuthService } from 'app/service/auth.service';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserLogin = new UserLogin();
  loggedUser: User = new User();
  constructor(private auth: AuthService, private router: Router, private userService: UserService, 
    private authService: AuthService) { 
  }

  ngOnInit() {

  }

  login(){
  localStorage.removeItem('token');
  this.auth.login(this.user.email, this.user.password)
      .subscribe(
        res => 
        {
          localStorage.setItem('token', res);
          this.router.navigate(['home']);

        },
        err => {
          alert("Wrong email or password");
          console.log("usao kao error za logovanje");
        }
      );
  }


}
