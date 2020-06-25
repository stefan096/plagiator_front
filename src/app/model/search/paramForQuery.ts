export class ParamForQuery {
    key: string;
    keys: string;
    value: string;
    phraseQuery: boolean;
    paramType: string;
    paramTypes: string[];

    constructor(){
        this.key = "";
        this.keys = "";
        this.value = "";
        this.paramType = "AND";
        this.phraseQuery = false;
        this.paramTypes = ["AND"];
    }
}