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
    //potencijalno namestiti multiselect
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log("AAA")
    console.log(this.selectedFiles)
    this.uploadFileService.upload(this.currentFileUpload)
    .subscribe(event => {
      alert("Uspesno ste dodali rad");
      //this.router.navigate(['home']);
    },
    err => {
      console.log('fail')
    });
  }

}
