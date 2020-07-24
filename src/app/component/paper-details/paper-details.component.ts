import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import PaperResultPlagiator from 'app/model/paper/paperResultPlagiator';
import { saveAs } from 'file-saver';
import { UploadFileService } from 'app/service/upload-file.service';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import Report from 'app/model/paper/report';
import Comment from 'app/model/paper/comment';
import { CONSTANT_FOR_SIMILAR_PAPER_VIEW, CONSTANT_FOR_DETAIL_PAPER_VIEW } from 'app/service/constants.service';
import ResultItem from 'app/model/paper/resultItem';
import { e } from '@angular/core/src/render3';

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
  constantRedColor: number = CONSTANT_FOR_DETAIL_PAPER_VIEW / 100;
  items: ResultItem[] = [];
  unsortedItems: ResultItem[] = [];
  sortedItems: ResultItem[] = [];
  sortState = false;
  p: any;

  constructor(route: ActivatedRoute, private uploadFileService: UploadFileService, private paperService: PaperService) {
    this.paperId = +route.snapshot.paramMap.get("paperId");
    this.paperResultPlagiator = JSON.parse(localStorage.getItem("paperResultPlagiator"));
    this.items = this.paperResultPlagiator.items;
    this.unsortedItems = this.paperResultPlagiator.items;
    this.sortedItems = this.paperResultPlagiator.items;

    this.paperService.getPaperById(this.paperId).subscribe(
      res => {
        this.paperToCompare = res;
       
      }
    )

   
   }

   sortItemsSimilarity(paperId){
    this.items.sort(
      function(item1, item2)
      {
        let item1Temp = undefined;
        let item2Temp = undefined;

        item1.papers.forEach(paper => {
          if(paper.id == paperId){
            item1Temp = paper.searchHits/item1.papers[0].searchHits;
          }
        })

        item2.papers.forEach(paper => {
          if(paper.id == paperId){
            item2Temp = paper.searchHits/item2.papers[0].searchHits;
          }
        })

        return item2Temp - item1Temp;
      });
   }

   sortItemsPartOfDocument(){
    this.items.sort(
      function(item1, item2)
      {
        return item1.partOfPage - item2.partOfPage;
      });
   }

  ngOnInit() {
  }

  checkValue(){
    if(this.sortState){
      this.sortItemsSimilarity(this.paperId);
    }
    else{
      this.sortItemsPartOfDocument();
    }
  }

  submitComment(){

    if(!this.comment.text){
      return;
    }

    if(!this.comment.matcheNumber){
      return;
    }

    if(this.comment.matcheNumber > 5){
      this.comment.matcheNumber = 5;
    }

    if(this.comment.matcheNumber < 1){
      this.comment.matcheNumber = 1;
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
