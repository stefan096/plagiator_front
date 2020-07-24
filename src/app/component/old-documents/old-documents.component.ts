import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'app/service/upload-file.service';

@Component({
  selector: 'app-old-documents',
  templateUrl: './old-documents.component.html',
  styleUrls: ['./old-documents.component.css']
})
export class OldDocumentsComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private uploadFileService: UploadFileService) {

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
    
    let temp = 0;
    for (var i = 0; i < this.selectedFiles.length; ++i) {
      this.uploadFileService.upload(this.selectedFiles.item(i))
      .subscribe(res => {
       temp += 1;

       if(temp == this.selectedFiles.length){
        alert("Uspesno ste dodali rad");
       }
      },
      err => {
        console.log('fail');
      });

    }
  }

}
