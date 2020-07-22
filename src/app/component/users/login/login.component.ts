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
    // if(localStorage.getItem('token') != null){
    //   this.loggedUser.email = this.authService.getUsername(localStorage.getItem('token'));
    //   let isAdmin = false;
    //   this.userService.findByEmail(this.loggedUser.email).subscribe(
    //     s=>{
    //       this.loggedUser = s;          
    //       // this.loggedUser.role.forEach(element =>
    //       //   {

              
    //       //   if(element.roleName == "ROLE_ADMIN"){
    //       //     isAdmin = true;
    //       //       }
    //       //     }
    //       //   )
    //   }
    //   )
    //   }
    }

  login(){
  localStorage.removeItem('token');
  this.auth.login(this.user.email, this.user.password)
      .subscribe(
        res => 
        {
          console.log(res);
          localStorage.setItem('token', res);
          //let role = this.auth.getRoles(res);

          
          //samo da bi postavio ulogo naog korisnika
          // this.userService.findByEmail(this.user.email).subscribe(
          //   s => {
          //     this.loggedUser = s;
          //     this.router.navigate(['home']);
              
          //   },
          //   err =>{
          //     console.log("err za pronalazenje po mailu");
          //   } 
          // );

          this.router.navigate(['home']);

        },
        err => {
          alert("Wrong email or password");
          console.log("usao kao error za logovanje");
        }
      );
  }


}
