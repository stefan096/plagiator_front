import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user/user';
import { AuthService } from 'app/service/auth.service';
import { Router } from '@angular/router';
import { Registration } from 'app/model/user/registration';
import { UserService } from 'app/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: Registration = new Registration();
  maxLength: number = 30;
  mailNotUnique: boolean = true;
  patternHigh: any = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$";

  constructor(private auth: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
   
  }

  validateEmail(email: string) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePasswordPattern(password: string){

    if(password.length < 12){
      return false;
    }

    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{12,}$/;
    return re.test(String(password));
  }
  

  validatePasswords(){
    if(this.user.password === this.user.repeatedPassword) {
      return true;
    }
    else {
      return false;
    }
  }

  proveriUnosKorisnik(): string {
    let message = "OK";

    if(this.user.email === "" || this.user.email.length > 60){
      return "Morate popuniti validnu e-mail adresu koja mora biti kraca od " + 60 + " karaktera";
    }
  
    if(!this.validateEmail(this.user.email)){
      return "Morate uneti validnu e-mail adresu";
    }
    
    if(this.user.password === "" || this.user.password.length > this.maxLength){
      return "Morate popuniti lozinku koja mora biti kraca od " + this.maxLength + " karaktera";
    }
  
    if(this.user.repeatedPassword === "" || this.user.repeatedPassword.length > this.maxLength){
      return "Morate popuniti ponovo lozinku koja mora biti kraca od " + this.maxLength + " karaktera";
    }
  
    if(!this.validatePasswords()){
      return "lozinka i potvrda lozinke moraju da se poklapaju!";
    }

    if(!this.validatePasswordPattern(this.user.password)){
      return "lozinka mora minimalno da ima 12 karaktera bar jedno malo, jedno veliko slovo, jedan broj i jedan specijalan znak!";
    }
  
    if(this.user.name === "" || this.user.name.length > this.maxLength){
      return "Morate popuniti ime koja mora biti kraca od " + this.maxLength + " karaktera";
    }
  
    if(this.user.lastName === "" || this.user.lastName.length > this.maxLength){
      return "Morate popuniti prezime koja mora biti kraca od " + this.maxLength + " karaktera";
    }
  
    if(this.user.phoneNumber === ""){
      return "Morate popuniti broj telefona";
    }
  
    if(!this.validatePhoneNumber(this.user.phoneNumber)){
      return "Morate popuniti validni broj telefona  na primer 000-000-0000";
    }
  
    return "OK";
  }


  validatePhoneNumber(broj: string){
    let re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test(String(broj).toLowerCase());
  }

  register(){
    let message: string = this.proveriUnosKorisnik();
    if(message === "OK")
    {
      this.auth.signup(this.user)
          .subscribe(
            res => 
            {
              this.router.navigate(['login'])
            },
            err => {
              console.log("usao kao error");
              if (err.status === 400) { // bad request losi kredencijali
                console.log("usao 400");
                this.mailNotUnique = false;
            }
          }
        )
    }
    else{
      alert(message);
    }
  }

}
