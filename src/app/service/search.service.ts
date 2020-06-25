import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from 'app/model/user/role';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { SimpleQuery } from 'app/model/search/simpleQuery';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + 'api';

  search(simpleQuery: SimpleQuery): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/search`, simpleQuery);
  }
}
