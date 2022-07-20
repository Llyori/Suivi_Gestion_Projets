import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Projet } from "src/domain/entities/projet.entity";
import { Tache } from "src/domain/entities/tache.entity";
import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";
import { ProjetService } from "../projet/projet.service";

@Injectable()
export class ProjectPlanService{
  constructor(
    @InjectRepository(Tache) private tacheRepository: Repository<Tache>,
    @InjectRepository(Projet) private projetRepository: Repository<Projet>,
    // @InjectRepository(Projet)
    // private projetR
    // private ps: ProjetService,
    
  ) {}

  async createTache(partial: Partial<Tache>): Promise<Tache> {
      return this.tacheRepository.save(partial).then((v) => Tache.new(v));
  }

  // async getTasksByDate() {
  //   const counts = await this.tacheRepository
  //   .createQueryBuilder()
  //   .select('COUNT(libelle)', 'taks')
  //   .addSelect('libelle')
  //   .groupBy('libelle')
  //   .orderBy('libelle')
  //   .getRawMany();
  //   const lables = [];
  //   const data = [];
  //   counts.forEach((i) => {
  //     lables.push(i.libelle);
  //     data.push(i.taks);
  //   });
  //   return {
  //     lables: lables,
  //     data: data,
  //   }
  // }

  async RemoveTask(idTache: number){
    return this.tacheRepository.delete({idTache: idTache});
  }

  async findAllTasks(idProjet) {
    return (
      await this.tacheRepository.find({
        idProjet: idProjet
      })
    ).map((e) => Tache.new(e));
  }

  async findTacheById(idTache: number){
    return this.tacheRepository.findOne({
      idTache: idTache,
    }).then((v) => Tache.new(v));
  }

  // async UpdateStatutTache(tache: Tache, id){
  //   tache.id = id;
  //   tache.statut = 'En cours';
  //   return this.tacheRepository.save(tache).then((v) => Tache.new(v)).catch();
  // }

  async findProjectById(idProjet: number): Promise<any> {
    return this.projetRepository.findOne({
      idProjet: idProjet,
    }).then((v) => Projet.new(v));
  }

  async UpdateStatutOfProject(projet: Projet, statut:string){
    projet.statut = statut;
    return this.projetRepository.save(projet).then((v) => Projet.new(v)).catch();
  }

  async UpdateStatutTacheProjet(idProjet){

    (await this.findAllTasks(idProjet)).forEach(async (e) => {
      e.statut = 'En Cours';
      await this.tacheRepository.save(e).then((v) => Tache.new(v)).catch();
    })

    await this.UpdateStatutOfProject((await this.findProjectById(idProjet)),('En cours'))

    // tache.id = id;
    // tache.statut = 'En cours';
    // return this.tacheRepository.save(tache).then((v) => Tache.new(v)).catch();
  }

}