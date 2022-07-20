import { Inject, Injectable } from "@nestjs/common";
import createDeveloperEquipeDto from "src/domain/dto/createdeveloperEquipe.dto";
import { developpeurEquipe } from "src/domain/entities/developpeur_equipe.entity";
import { developpeurEquipeService } from "./developpeur_equipe.services";

@Injectable()
export class DeveloppeurEquipeActions{
    constructor(
        private developpeurService: developpeurEquipeService
    ){}

    async createDeveloppeurEquipe(idUser , idEquipe){
        return this.developpeurService.createDeveloppeurEquipe({
            idEquipe: idEquipe,
            idDeveloppeur: idUser,
        })
    }

    async getDeveloperByEquipe(idEquipe){
        return await this.developpeurService.findDeveloperEquipeById(idEquipe);
    }

    async RemoveDevOnTeam(idDeveloppeur){
        return this.developpeurService.RemoveDeveloperonEquipe(idDeveloppeur)
    }

    async FindAllEquipeDeveloppeurById(idDeveloppeur){
        return await this.developpeurService.getAllDeveloperTeamByIdDeveloper(idDeveloppeur);
    }

    async FindAllEquipeProjetByEquipe(idEquipe){
        return await this.developpeurService.getAllEquipeProjectByIdEquipe(idEquipe)
    }

    async CHefEquipe(idEquipe){
        return this.developpeurService.ChefEquipe(idEquipe);
    }

    async GetAllChef(){
        return await this.developpeurService.GetAllChef();
    }

    async getOneDeveloperEquipe(idEquipe,idDeveloper){
        return await this.developpeurService.findDeveloperEquipe(idEquipe,idDeveloper)
    }

    async SelectTchiefTeam(dv: developpeurEquipe,idEquipe){
        return await this.developpeurService.updateChefDeveloperTeam(dv,idEquipe);
    }

}