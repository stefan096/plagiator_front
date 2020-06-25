import { Role } from "./role";

export class Registration{

    id: number;
    name: string;
	lastName: string;
	password: string;
    repeatedPassword: string;
    email: string;
    role: Role;
    phoneNumber: string;

    constructor(){
        this.id = 0;
        this.name = "";
        this.lastName = "";
        this.password = "";
        this.repeatedPassword = "";
        this.email = "";
        this.role = new Role();
        this.phoneNumber = "";
    }

}