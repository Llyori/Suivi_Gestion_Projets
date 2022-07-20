import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';
import { Tache } from '../entities/tache.entity';
import { TacheDetail } from '../entities/Tache_Details.entity';
import { User } from '../entities/user.entity';
export default class createDetailTacheDto{
    

    @IsNotEmpty()
    idTache

    idTacheDetail: number;

    difficulte: string;

    besoin: string;

    @IsNotEmpty()
    travailFait:string;

    @IsNotEmpty()
    date:string;

    fichier: File;

    uuid: string;

    commentaire: string;
}