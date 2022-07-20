import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { Projet } from "src/domain/entities/projet.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProjetService{
    constructor(
        @InjectRepository(Projet) private projetRepository: Repository<Projet>,
        @InjectRepository(EquipeProjet)
        private EQuipeProjetRepository: Repository<EquipeProjet>
      ) {}

    async createProject(partial: Partial<Projet>): Promise<Projet> {
        return this.projetRepository.save(partial).then((v) => Projet.new(v));
    }

    async findAllProjects(){
        return (
            await this.projetRepository.find()
        ).map((e) => Projet.new(e));
    }

    async findProjectById(idProjet: number): Promise<any> {
        return this.projetRepository.findOne({
          idProjet: idProjet,
        }).then((v) => Projet.new(v));
    }

    async UpdateStatutOfProject(projet: Projet, statut:string){
        projet.statut = statut;
        return await this.projetRepository.save(projet).then((v) => Projet.new(v)).catch();
    }

    async CreateTeamProject(partial: Partial<EquipeProjet>): Promise<EquipeProjet>{
        return this.EQuipeProjetRepository.save(partial).then((v) => EquipeProjet.new(v));
    }

    async deleteProjet(idProjet){
        return await this.projetRepository.delete({idProjet: idProjet});
    }

}