import { Role } from "./role";

export class User{

    id: number;
	name: string;
    lastName: string;
    phoneNumber: string;
	email: string;
    role: Role;
    active: boolean;
    
    constructor(){
        this.id = 0;
        this.name = ""
        this.lastName = "";
        this.email = "";
        this.role = new Role();
        this.active = true;
        this.phoneNumber = "";
    }

}