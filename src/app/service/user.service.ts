import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/model/user/user';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {

  baseUrl: string = environment.baseUrl + 'api';

  constructor(private http: HttpClient) { }


  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/email/${email}`);
  }

  activateUser(userId: number): Observable<any> {
    return this.http.get<any>(this.baseUrl +  `/registration/activate/${userId}`);
  }



  findOne(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/users/${id}`);
  }

  changeStateOfUser(id: number, boolState: boolean): Observable<User> {
    return this.http.get<User>(this.baseUrl + `/users/${id}/state/${boolState}`);
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + `/users`);
  }


  addRoleToUser(userId: number, roleId:number): Observable<{}>{
    return this.http.get(this.baseUrl + `/users/${userId}/role/${roleId}`);
  }

  deleteRoleFromUser(userId: number, roleId:number): Observable<{}>{
    return this.http.delete(this.baseUrl + `/users/${userId}/role/${roleId}`);
  }

  deleteUser(userId: number): Observable<{}>{
    return this.http.delete(this.baseUrl + `/users/${userId}`);
  }


}
