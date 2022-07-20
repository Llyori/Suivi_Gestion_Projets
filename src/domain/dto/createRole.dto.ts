import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';

export default class createRoleDto{

    @IsNotEmpty()
    nomRole: string;

    idRole: number;

    uuid: string;
    
}