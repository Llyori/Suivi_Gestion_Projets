import { Injectable } from "@nestjs/common";
import createProjetDto from "src/domain/dto/createproject.dto";
import createProjectTeam from "src/domain/dto/createProjectTeam.dto";
import { Projet } from "src/domain/entities/projet.entity";
import { ProjetService } from "./projet.service";

@Injectable()
export class ProjetActions{
    constructor(
        private projetService: ProjetService,
    ){}

    async createProjet(dto: createProjetDto){
        return this.projetService.createProject({
            idAdmin: dto.idAdmin,
            nomClient: dto.nomClient,
            nomProjet: dto.nomProjet,
            libelle: dto.libelle,
            dateFinProjet: dto.dateFinProjet,
            statut: 'En Attente'
        })
    }

    async getAllProjects() {
        //console.log(await this.projetService.getTasksByDate());
        return await this.projetService.findAllProjects();
    }

    async getProject(idProjet: number) {
        return await this.projetService.findProjectById(idProjet)
    }

    async UpdateStatutOfProject(projet: Projet, val){
        return  await this.projetService.UpdateStatutOfProject(projet,val);
    }

    async removeProjet(idProjet){
        return await this.projetService.deleteProjet(idProjet)
    }

    async CreateEquipeProjet(projet: Projet, dto){
        let v='soumis'
        await this.projetService.UpdateStatutOfProject(projet,v);
        return this.projetService.CreateTeamProject({
            idEquipe: dto.idEquipe,
            idProjet: dto.idProjet
        })
    }
}