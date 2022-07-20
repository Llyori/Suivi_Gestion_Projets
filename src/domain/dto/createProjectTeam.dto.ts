import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';

export default class createProjectTeam{

    @IsNotEmpty()
    idProjet: number;

    @IsNotEmpty()
    idEquipe: number;

    uuid: string;
    
}