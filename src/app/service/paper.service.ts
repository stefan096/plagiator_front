import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Paper } from 'app/model/paper/paper';
import { Observable } from 'rxjs';
import Report from 'app/model/paper/report';
import Comment from 'app/model/paper/comment';

@Injectable()
export class PaperService {

  baseUrl: string = environment.baseUrl + 'api/papers';

  constructor(private http: HttpClient) { 

  }

  showPapers(): Observable<Paper[]>{
    return this.http.get<Paper[]>(this.baseUrl);
  }

  getPaperById(id: number): Observable<Paper>{
    return this.http.get<Paper>(this.baseUrl + "/" + id);
  }

  submitComment(report: Report): Observable<Report>{
    return this.http.post<Report>(this.baseUrl + "/comments", report);
  }

  deletePaper(id: number): Observable<{}>{
    return this.http.delete(this.baseUrl + "/" + id);
  }

  getCommentsForPaper(id: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.baseUrl + "/" + id + "/comments");
  }
}
