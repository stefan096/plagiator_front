import { Component, OnInit } from '@angular/core';
import { Paper } from 'app/model/paper/paper';
import { PaperService } from 'app/service/paper.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Comment from 'app/model/paper/comment';
import { User } from 'app/model/user/user';
import { UploadFileService } from 'app/service/upload-file.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private paperService: PaperService, private modalService: NgbModal,
     private uploadFileService: UploadFileService) 
     {

     }

  papers: Paper[] = [];

  modalReference: NgbActiveModal;
  dropdownSettings = {};
  p: any;
  comments: Comment[] = [];

  ngOnInit() {
    this.getAllData();
  }

  getAllData(){
    this.paperService.showPapers().subscribe(
      res => {
        this.papers = res;
      }
    )
  }

  viewComments(paper: Paper, viewConnected: any){
    // let comment = new Comment();
    // comment.text = "aaa";
    // let user: User = new User();
    // user.email = "email";
    // comment.user = user;
    // comment.matcheNumber = 2;
    // this.comments.push(comment);
    this.paperService.getCommentsForPaper(paper.id).subscribe(
      res => {
        this.comments = res;
      }
    )
    this.modalReference = this.modalService.open(viewConnected, { centered: true });
  }

  deletePaper(id: number){
    this.paperService.deletePaper(id).subscribe(
      res => {
        this.getAllData();
      }
    )
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

}
