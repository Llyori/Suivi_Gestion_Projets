import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';

export default class CreateTeamDto {

    @IsNotEmpty()
    nomEquipe: string;

    statut: string;

    uuid: string;


}