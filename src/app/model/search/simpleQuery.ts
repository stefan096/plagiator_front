import { ParamForQuery } from "./paramForQuery";

export class SimpleQuery {
    params: ParamForQuery[];
	pageNum: number;
    allFields: boolean;
    wildcardQuery: boolean;

    constructor(){
        this.params = [];
        this.pageNum = 1;
        this.allFields = false;
        this.wildcardQuery = false;
    }
}