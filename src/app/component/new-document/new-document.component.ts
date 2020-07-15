import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'app/service/upload-file.service';
import { saveAs } from 'file-saver';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  papers: Paper[] = [];

  constructor(private uploadFileService: UploadFileService,
    private paperService: PaperService) {

   }

  ngOnInit() {
    this.paperService.showPapers().subscribe(
      res => {
        this.papers = res;
      }
    )
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;

  }

  uploadFile(){
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFileService.upload(this.currentFileUpload)
    .subscribe(event => {
      alert("Uspesno ste dodali rad");
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