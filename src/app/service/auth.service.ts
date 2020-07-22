import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Registration } from 'app/model/user/registration';
import { environment } from 'environments/environment';


@Injectable()
export class AuthService {
  //baseUrl: string = environment.baseUrl + 'login';
  baseUrl: string = "/api";

  constructor(private http: HttpClient,
    private router: Router) { }

    getRoles(token: string) {
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      //console.log(decodedJwtData);
      //console.log(decodedJwtData.auth[0].authority);
      //console.log(decodedJwtData.sub); //username
      return decodedJwtData.auth[0].authority; //you can access role or username
    }
  
    getUsername(token: string) : string{
      let jwtData = token.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      //console.log(decodedJwtData);
      //console.log(decodedJwtData.auth[0].authority);
      //console.log(decodedJwtData.sub); //username
      return decodedJwtData.sub; //you can access role or username
    }
  
    login(email:string, password:string): Observable<string>{
      const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
      return this.http
        .post<string>(this.baseUrl + '/login', {email, password});
    }


    signup(registration: Registration): Observable<{}>{
      return this.http
        .post<{}>(this.baseUrl + '/signup', registration);
    }


    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('paperResultPlagiator');
      this.router.navigate(['login']);
    }

}