import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';
export default class createProjetDto{
    
    @IsNotEmpty()
    idAdmin: number;
    
    @IsNotEmpty()
    nomClient: string;
    
    @IsNotEmpty()
    nomProjet: string;

    @IsNotEmpty()
    libelle: string;

    @IsNotEmpty()
    dateFinProjet: string;

    statut: string;

    uuid: string;

    progression:number;


}