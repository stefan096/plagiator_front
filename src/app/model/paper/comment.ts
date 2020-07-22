import { User } from "../user/user";

export default class Comment {
	id: number;
	text: string;
	user: User;
	datetime: string;
    matcheNumber: number; // skala od 1 do 5
    plagiatWith: string;
    
    constructor(){
        this.id = 0;
        this.text = undefined;
        this.user = new User();
        this.datetime = "";
        this.matcheNumber = undefined;
        this.plagiatWith = "";
    }
}
