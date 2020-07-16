import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Paper } from 'app/model/paper/paper';

@Injectable()
export class UploadFileService {

  baseUrl: string = environment.baseUrl + 'api/file';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    let paper: Paper = new Paper()
    paper.file = file;
    
    return this.http.post(this.baseUrl + `/upload`, formdata);
  }

  uploadNewPaper(file: File): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    let paper: Paper = new Paper()
    paper.file = file;
    
    return this.http.post(this.baseUrl + `/upload/new`, formdata);
  }


  download(paperId: number){
    return this.http.get(this.baseUrl + `/download/${paperId}`, {responseType: 'blob'});
  }
}
