import { Get, Injectable, Param } from "@nestjs/common";
import { Projetcontroller } from "src/application/modules/web/controllers/projet.controller";
import createProjetDto from "src/domain/dto/createproject.dto";
import CreateTacheDto from "src/domain/dto/createtache.dto";
import { Projet } from "src/domain/entities/projet.entity";
import { Tache } from "src/domain/entities/tache.entity";
import { ProjectPlanService } from "./projectplan.service";

@Injectable()
export class ProjectPlanActions{
    constructor(
        private projectPlanService: ProjectPlanService
        
    ){}

    async getAllTasks(idProjet) {
        //console.log(await this.projectPlanService.getTasksByDate());
        return await this.projectPlanService.findAllTasks(idProjet);
    }

    async RemoveTask (idTache: number){
        return  this.projectPlanService.RemoveTask(idTache)
    }

    async createTache(dto: CreateTacheDto){
        if((dto.dateFin > dto.fin) || (dto.dateDebut > dto.dateFin)){
            throw Error('Erreur sur les dates')
        }
        else{
            return this.projectPlanService.createTache({
                idProjet: dto.idProjet,
                nomTache: dto.nomTache,
                libelle: dto.libelle,
                dateDebut: dto.dateDebut,
                dateFin: dto.dateFin,
                statut: 'En attente',
                id: dto.id
            })
        }
        
    }

    async UpdateStatutTacheProjet(idProjet){
        return await this.projectPlanService.UpdateStatutTacheProjet(idProjet);
    }

    async getTaskById(idTache){
        return await this.projectPlanService.findTacheById(idTache)
    }
}