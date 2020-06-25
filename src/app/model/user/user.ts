import { Role } from "./role";

export class User{

    id: number;
	name: string;
	lastName: string;
	email: string ;
    role: Role[];
    username: string;
    active: boolean;
    taskId: string;
    
    constructor(){
        this.id = 0;
        this.name = ""
        this.lastName = "";
        this.email = "";
        this.role = [];
        this.username = "";
        this.active = true;
        this.taskId = "";
    }

}