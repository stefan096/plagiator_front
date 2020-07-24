import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'app/service/upload-file.service';
import { saveAs } from 'file-saver';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import PaperResultPlagiator from 'app/model/paper/paperResultPlagiator';
import ResultItem from 'app/model/paper/resultItem';
import { Router, ActivatedRoute } from '@angular/router';
import { CONSTANT_FOR_SIMILAR_PAPER_VIEW, CONSTANT_FOR_NORMALIZATION } from 'app/service/constants.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  papers: Paper[] = [];
  paperResultPlagiator: PaperResultPlagiator = new PaperResultPlagiator();
  similarPapers: Paper[] = [];
  constantRedColor: number = CONSTANT_FOR_SIMILAR_PAPER_VIEW / 100;
  //constantNormalization: number = CONSTANT_FOR_NORMALIZATION;
  constantNormalization: number = 1;
  plagiatorId: number = undefined;
  wrongAnalysis = false;

  constructor(private uploadFileService: UploadFileService,
    private paperService: PaperService, private router: Router, route: ActivatedRoute) {

      let res = localStorage.getItem('token');
      if(!res){
        this.router.navigate(['login']);
      }

      this.plagiatorId = +route.snapshot.paramMap.get("plagiatorId");

      if(this.plagiatorId){
        this.uploadFileService.getResultsForPaper(this.plagiatorId).subscribe(
          res => {
            this.paperResultPlagiator = res;
            localStorage.setItem("paperResultPlagiator", JSON.stringify(this.paperResultPlagiator));
            this.similarPapers = this.paperResultPlagiator.similarPapers;
          },
          err => {
            // if(err.status == 400){
            //   this.wrongAnalysis = true;
            // }

            this.router.navigate(['home']);
          }
        )
      }
      else{
        let temp: PaperResultPlagiator = JSON.parse(localStorage.getItem("paperResultPlagiator"));
        if(temp){
          this.paperResultPlagiator = temp;
        }
        else{
          this.paperResultPlagiator = new PaperResultPlagiator();
        }
      }
   }

  ngOnInit() {

  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
    if (!this.selectedFiles) {
      return;
    }

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileService.uploadNewPaper(this.currentFileUpload)
    .subscribe(res => {
      //alert("Uspesno ste dodali rad");
      this.paperResultPlagiator = res;
      localStorage.setItem("paperResultPlagiator", JSON.stringify(this.paperResultPlagiator));
      this.similarPapers = this.paperResultPlagiator.similarPapers;
      //console.log(this.paperResultPlagiator)
    },
    err => {
      console.log('fail')
    });
  }

  
  download(id: number, title: string){
    this.uploadFileService.download(id).subscribe(
      (res: any) => {
        var filename = title;
        saveAs(res, filename);
      },
      (error: any) => {
        alert('Greska!')
      }
    )
  }

  details(id: number){
    this.router.navigate(['new-document/' + id + '/details']);
  }

  deleteFile(){
    this.paperService.deletePaper(this.paperResultPlagiator.uploadedPaper.id).subscribe(
      res => {
        localStorage.removeItem('paperResultPlagiator');
        window.location.reload();
        //alert("Uspešno ste obrisali fajl");
      }
    )
  }

}