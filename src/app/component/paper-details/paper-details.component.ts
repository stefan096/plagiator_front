import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import PaperResultPlagiator from 'app/model/paper/paperResultPlagiator';
import { saveAs } from 'file-saver';
import { UploadFileService } from 'app/service/upload-file.service';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import Report from 'app/model/paper/report';
import Comment from 'app/model/paper/comment';

@Component({
  selector: 'app-paper-details',
  templateUrl: './paper-details.component.html',
  styleUrls: ['./paper-details.component.css']
})
export class PaperDetailsComponent implements OnInit {

  paperId: number = 0;
  paperResultPlagiator: PaperResultPlagiator = new PaperResultPlagiator();
  wordsPerPart: number = 950;
  paperToCompare: Paper = new Paper();
  report: Report = new Report();
  comment: Comment = new Comment();

  constructor(route: ActivatedRoute, private uploadFileService: UploadFileService, private paperService: PaperService) {
    this.paperId = +route.snapshot.paramMap.get("paperId");
    this.paperResultPlagiator = JSON.parse(localStorage.getItem("paperResultPlagiator"));

    this.paperService.getPaperById(this.paperId).subscribe(
      res => {
        this.paperToCompare = res;
      }
    )
   }

  ngOnInit() {
  }

  submitComment(){

    if(!this.comment.text){
      return;
    }

    if(!this.comment.matcheNumber){
      return;
    }

    this.report.paperToCheck = this.paperResultPlagiator.uploadedPaper; //ovaj dokument se malopre uplodovao
    this.report.paperUploaded = this.paperToCompare; //ovaj dokument je vec davno uplodovan
    this.report.comments.push(this.comment);

    this.paperService.submitComment(this.report).subscribe(
      res => {
        alert('Komentar je uspešno poslat!')
      }
    )
  }

  download(id: number, title: string){
    this.uploadFileService.download(id).subscribe(
      (res: any) => {
        console.log(res)
        var filename = title;
        saveAs(res, filename);
      },
      (error: any) => {
        alert('Greska!')
      }
    )
  }

}
