import { Paper } from "./paper";

export default class ResultItem{
    public papers: Paper[];
    public partOfPage: number;
    
    constructor(){
        this.papers = [];
        this.partOfPage = 0;
    }
}