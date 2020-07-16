import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'app/service/upload-file.service';
import { saveAs } from 'file-saver';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import PaperResultPlagiator from 'app/model/paper/paperResultPlagiator';
import ResultItem from 'app/model/paper/resultItem';

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
  //items: ResultItem[] = 

  constructor(private uploadFileService: UploadFileService,
    private paperService: PaperService) {

   }

  ngOnInit() {
    // this.paperService.showPapers().subscribe(
    //   res => {
    //     this.papers = res;
    //   }
    // )
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
      //console.log(this.paperResultPlagiator)
    },
    err => {
      console.log('fail')
    });
  }

  
  download(id: number, title: string){
    this.uploadFileService.download(id).subscribe(
      (res: any) => {
        console.log(res)
        //var filename = title +'.pdf';
        var filename = title;
        saveAs(res, filename);
      },
      (error: any) => {
        alert('Greska!')
      }
    )
  }

}