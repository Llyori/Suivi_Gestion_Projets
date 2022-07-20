import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import createProjectTeam from "src/domain/dto/createProjectTeam.dto";
import { Equipe } from "src/domain/entities/equipe.entity";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeamService{
    constructor(
        @InjectRepository(Equipe) 
        private teamRepository: Repository<Equipe>,

        @InjectRepository(EquipeProjet)
        private equipeProjetRepository: Repository<EquipeProjet>
    ){}

    async createTeam(partial: Partial<Equipe>): Promise<Equipe>{
        return this.teamRepository.save(partial).then((v) => Equipe.new(v));
    }

    async findAllTeams(){
        return(
            await this.teamRepository.find()
        ).map((e) => Equipe.new(e))
    }

    async updateStatutTeam(team: Equipe, val:boolean){
        team.statut = val;
        return this.teamRepository.save(team).then((v) => Equipe.new(v)).catch();
    }

    async FindTeanById(idEquipe):Promise<Equipe>{
        return this.teamRepository.findOne({
            idEquipe: idEquipe
        }).then((v) => Equipe.new(v));
    }

    async createProjectTeam(partial: Partial<EquipeProjet>): Promise<EquipeProjet>{
        return this.equipeProjetRepository.save(partial).then((v) => EquipeProjet.new(v));
    }

    async GetAllEquipeProjet(){
        return (
            await this.equipeProjetRepository.find()
        ).map((e) => EquipeProjet.new(e))
    }

}