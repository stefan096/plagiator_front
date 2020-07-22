import ResultItem from "./resultItem";
import { Paper } from "./paper";

export default class PaperResultPlagiator {
    items: ResultItem[];
    similarPapers: Paper[];
    uploadedPaper: Paper;
    
    constructor(){
        this.items = [];
        this.similarPapers = [];
        this.uploadedPaper = new Paper();
    }
}