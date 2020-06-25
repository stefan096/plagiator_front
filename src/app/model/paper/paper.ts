
import { THROW_IF_NOT_FOUND } from "@angular/core/src/di/injector";

export class Paper {

    id: number;
    title: string;
    keyTerms: string;
    abstractForPaper: string;
    pathForPDF: string;
	version: number;
	finalVersion: boolean;
    DOI: string;
    paperStatus: string;
    price: number;
    file: any;
    dto: any[] = [];
    taskId: string;
    state: string;
    comment: Comment;
    showButton: boolean;

    constructor(){
        this.id = 0;
        this.title = "";
        this.abstractForPaper = "";
        this.keyTerms = "";
        this.pathForPDF = "";
        this.version = 0;
        this.finalVersion = false;
        this.DOI = "";
        this.paperStatus = "";
        this.price = 0;
        this.file = ""
        this.dto = [];
        this.state = "";
        this.showButton = false;
    }

}