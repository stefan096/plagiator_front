import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { UserService } from 'app/service/user.service';
import { User } from 'app/model/user/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  isAdmin = false;
  isLogged = false;
  loggedUser: User = new User();
  
  constructor(private authService: AuthService, 
              private userService: UserService, 
              private router: Router) { }

  ngOnInit() {
    let res = localStorage.getItem('token');
    if(res != null){
      this.loggedIn = true;
      this.loggedUser.email = this.authService.getUsername(res);
      this.userService.findByEmail(this.loggedUser.email).subscribe(
        s=>{
          this.loggedUser = s;
          console.log(s);
          let roleName = this.loggedUser.role.userType;

            if(roleName == "ROLE_ADMIN"){
              this.isAdmin = true;
            }

            if(roleName == "ROLE_LOGGED"){
              this.isLogged = true;
            }

          });
    }
  }

  logOut(){
    this.authService.logout();
    this.loggedIn = false;
    this.router.navigate(['login']);
  }

}
