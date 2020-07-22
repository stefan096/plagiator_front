import { Paper } from "./paper";

export default class ResultItem{
    public papers: Paper[];
    public partOfPage: number;
    public textToShow: string;
    
    constructor(){
        this.papers = [];
        this.partOfPage = 0;
        this.textToShow = "";
    }
}