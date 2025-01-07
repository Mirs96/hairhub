import { Data } from "@angular/router";
import { Role } from "../role";

export interface RegisterDto{
    firstname: string;
    lastname: string;
    nickname: string;
    dob: Date;
    sex: string;
    mail: string;
    pass: string;
    phone: string;
    role: Role;

} 