import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from 'app/model/user/role';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl;

  findOne(id: number): Observable<Role> {
    return this.http.get<Role>(this.baseUrl + `roles/${id}`);
  }

  findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + `roles`);
  }


  save(role: Role): Observable<Role>{
    return this.http.post<Role>(this.baseUrl + 'roles', role);
  }

  update(role: Role): Observable<Role>{
    return this.http.put<Role>(this.baseUrl + `roles/${role.id}`, role);
  }

}
