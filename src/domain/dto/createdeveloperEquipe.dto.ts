import { IsEmail, IsEnum, IsNotEmpty, IsString, } from 'class-validator';
import { Equipe } from '../entities/equipe.entity';
import { User } from '../entities/user.entity';
export default class createDeveloperEquipeDto{

    @IsNotEmpty()
    idEquipe: Equipe;

    @IsNotEmpty()
    idDeveloper: User;

   
    chefEquipe: boolean;


}