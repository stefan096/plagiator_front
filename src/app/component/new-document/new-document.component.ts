import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'app/service/upload-file.service';
import { saveAs } from 'file-saver';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import PaperResultPlagiator from 'app/model/paper/paperResultPlagiator';
import ResultItem from 'app/model/paper/resultItem';
import { Router } from '@angular/router';

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

  constructor(private uploadFileService: UploadFileService,
    private paperService: PaperService, private router: Router) {

   }

  ngOnInit() {

    let temp: PaperResultPlagiator = JSON.parse(localStorage.getItem("paperResultPlagiator"));
    if(temp){
      this.paperResultPlagiator = temp;
    }
    else{
      this.paperResultPlagiator = new PaperResultPlagiator();
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
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