import { Injectable } from "@nestjs/common";
import createProjectTeam from "src/domain/dto/createProjectTeam.dto";
import CreateTeamDto from "src/domain/dto/createteam.dto";
import { Equipe } from "src/domain/entities/equipe.entity";
import { TeamService } from "./team.services";

@Injectable()
export class TeamActions{
    constructor(
        private teamService: TeamService
    ){}

    async createTeam(dto: CreateTeamDto){
        return this.teamService.createTeam({
            nomEquipe: dto.nomEquipe,
        })
    }

    async updateStatutTeam(team: Equipe, val:boolean){
        return this.teamService.updateStatutTeam(team, val);
    }

    async FindTeamById(idEquipe){
        return this.teamService.FindTeanById(idEquipe);
    }

    async getAllTeam(){
        return await this.teamService.findAllTeams();
    }

    async getAllTeamByDeveloper(uuid:string){
        return await this.teamService
    }

    async createProjectTeam(dto){
        return this.teamService.createProjectTeam({
            idProjet: dto.idProjet,
            idEquipe: dto.idEquipe
        })
    }

    async GetAllEquipeProjet(){
        return await this.teamService.GetAllEquipeProjet()
    }
}