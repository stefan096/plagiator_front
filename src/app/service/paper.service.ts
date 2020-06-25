import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Paper } from 'app/model/paper/paper';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PaperService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.baseUrl + 'api/papers';
  baseUrlCamunda: string = environment.baseUrl + 'camunda/paper';

  baseUrlReview: string = environment.baseUrl + 'api/reviews';

  save(paper: Paper): Observable<Paper>{
    return this.http.post<Paper>(this.baseUrl, paper);
  }

  addPaper(file: File, paper: Paper, taskId: string, journalId: number): Observable<any>{
    let formdata: FormData = new FormData();
    // formdata.append('file', file);
    // formdata.append('title', paper.title)
    // formdata.append('keyTerms', paper.keyTerms)
    // formdata.append('abstractForPaper', paper.abstractForPaper)
    // formdata.append('scientificAreaForPaper', JSON.stringify(paper.scientificAreaForPaper))
    // formdata.append('coauthors', JSON.stringify(paper.coauthors))
    
    return this.http.post(this.baseUrlCamunda + `/upload/${taskId}/${journalId}`, formdata);
  }

  reupload(file: File, paper: Paper, taskId: string): Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    
    return this.http.post(this.baseUrlCamunda + `/reupload/${taskId}/${paper.id}`, formdata);
  }

  showPapers(): Observable<Paper[]>{
    return this.http.get<Paper[]>(this.baseUrlCamunda +  '/get/papersForView');
  }

  download(paperId: number){
    return this.http.get(this.baseUrlCamunda + `/download/${paperId}`, {responseType: 'blob'});
  }

}
