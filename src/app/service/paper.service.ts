import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paper } from 'app/model/paper/paper';
import { Observable } from 'rxjs';

@Injectable()
export class PaperService {

  baseUrl: string = environment.baseUrl + 'api/papers';

  constructor(private http: HttpClient) { 

  }

  showPapers(): Observable<Paper[]>{
    return this.http.get<Paper[]>(this.baseUrl);
  }
}
