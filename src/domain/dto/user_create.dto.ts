import { Role } from "../entities/role.entity";

export default class createUserDto{
   
    name: string;

    
    telephone: string;

    
    password: string;

    
    role: Role;
    
    uuid: string;

    uu: string;

    status: string;

    
    
    // salt: string; // permet d'encrypter le paassword

    
    
    // status: string;
}