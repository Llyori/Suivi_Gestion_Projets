import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';
import { Projet } from '../entities/projet.entity';
import { User } from '../entities/user.entity';

export default class CreateTacheDto{

    @IsNotEmpty()
    idProjet: Projet;

    @IsNotEmpty()
    nomTache: string;

    @IsNotEmpty()
    fin: string;

    uuidDeveloppeur: string;

    @IsNotEmpty()
    libelle: string;

    @IsNotEmpty()
    id: User;

    @IsNotEmpty()
    dateDebut: string;

    @IsNotEmpty()
    dateFin: string;

    uuid: string;
    idEquipe: number;
}