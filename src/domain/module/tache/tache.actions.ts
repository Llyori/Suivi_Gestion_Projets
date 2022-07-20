import { Injectable } from "@nestjs/common";
import createDetailTacheDto from "src/domain/dto/createDetailTask.dto";
import { Tache } from "src/domain/entities/tache.entity";
import { TacheDetail } from "src/domain/entities/Tache_Details.entity";
import { TacheService } from "./tache.services";

@Injectable()
export class TacheActions{
    constructor(
        private TacheService: TacheService
    ){}

    async getTacheById(idTache: number){
        return await this.TacheService.findTacheById(idTache);
    }

    async findAllTacheDetailOfTacheById(idTache){
        return await this.TacheService.findAllTacheDetailOfTacheById(idTache);
    }

    async FindTacheDetailById(idTacheDetail){
        return await this.TacheService.FindTacheDetailById(idTacheDetail)
    }

    async rejeterEtat(tache, dto){
        return this.TacheService.rejeterEtat(tache, dto);
    }

    async findAllTacheByUSer(id){
        return await this.TacheService.findAllTacheByUSer(id)
    }

    async updateStatutDetailTache(idTache, statut){
        return await this.TacheService.updateStatutDetailTache(idTache,statut)
    }

    async GetAllDetailTache(){
        return this.TacheService.GetAllTacheDetail()
    }

    async updateTache(tache: Tache, statut){
        return await this.TacheService.updateTache(tache, statut)
    }

    async updateStatutDetailTacheOne(detailTache: TacheDetail, statut){
        return await this.TacheService.updateStatutDetailTacheOne(detailTache,statut)
    }

    async createDetailTache(dto: createDetailTacheDto){
        if((await (this.getTacheById(dto.idTache))).dateFin < dto.date){
            throw Error('Erreur sur les Dates')
        }else{
            return await this.TacheService.createDetailTache({
                idTache: dto.idTache,
                difficulte: dto.difficulte,
                besoin: dto.besoin,
                travailFait: dto.travailFait,
                date: dto.date,
                statut: 'En Attente'
            })
        }
    }
}