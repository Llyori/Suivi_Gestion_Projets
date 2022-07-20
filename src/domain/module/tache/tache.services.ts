import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import createDetailTacheDto from "src/domain/dto/createDetailTask.dto";
import { Tache } from "src/domain/entities/tache.entity";
import { TacheDetail } from "src/domain/entities/Tache_Details.entity";
import { Repository } from "typeorm";

@Injectable()
export class TacheService{
    constructor(
        @InjectRepository(Tache)
        private tacheRepository: Repository<Tache>,
        @InjectRepository(TacheDetail)
        private tacheDetailRepository: Repository<TacheDetail>
    ){}

    async findAllTacheByUSer(id){
        return (
            await this.tacheRepository.find({
                id: id,
            })
        ).map((e) => Tache.new(e))
    }

    async findTacheById(idTache:number): Promise<Tache>{
        return this.tacheRepository.findOne({
            idTache: idTache,
        }).then((v) => Tache.new(v));
    }

    async findAllTacheDetailOfTacheById(idTache){
        return (
            await this.tacheDetailRepository.find({
                idTache: idTache
            })
        ).map((e) => TacheDetail.new(e));
    }

    async GetAllTacheDetail(){
        return (
            await this.tacheDetailRepository.find()
        ).map((e) => TacheDetail.new(e))
    }

    async createDetailTache(partial: Partial<TacheDetail>): Promise<TacheDetail>{
        return await this.tacheDetailRepository.save(partial).then((v) => TacheDetail.new(v));
    }

    async FindTacheDetailById(idTacheDetail){
        return (
            await this.tacheDetailRepository.findOne({
                idTacheDetail: idTacheDetail,
            }).then((v) => TacheDetail.new(v))
        )
    }

    async updateStatutDetailTache(idTache, statut){

        return (
            (await this.findAllTacheDetailOfTacheById(idTache)).forEach(async (e) => {
                if(e.statut == 'En Attente'){
                    e.statut = statut
                }
                await this.tacheDetailRepository.save(e).then((v) => TacheDetail.new(v)).catch()
            })
        )
    }

    async rejeterEtat(tache:TacheDetail, dto: createDetailTacheDto){
        tache.statut = 'rejete',
        tache.commentaire = dto.commentaire
        await this.tacheDetailRepository.save(tache).then((v) => TacheDetail.new(v)).catch()
    }

    async updateTache(tache: Tache, statut){
        tache.statut = statut
        await this.tacheRepository.save(tache).then((v) => Tache.new(v)).catch()
    }

    async updateStatutDetailTacheOne(detailTache: TacheDetail, statut){
        detailTache.statut = statut;
        return await this.tacheDetailRepository.save(detailTache).then((v) => TacheDetail.new(v)).catch()
    }
    
}