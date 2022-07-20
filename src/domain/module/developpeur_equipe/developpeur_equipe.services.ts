import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { developpeurEquipe } from "src/domain/entities/developpeur_equipe.entity";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class developpeurEquipeService{
    constructor(
        @InjectRepository(developpeurEquipe) 
        private developpeurRepository: Repository<developpeurEquipe>,
        @InjectRepository(EquipeProjet)
        private EquipeProjetRepository: Repository<EquipeProjet>,
    ){}

    async createDeveloppeurEquipe(partial: Partial<developpeurEquipe>): Promise<developpeurEquipe> {
        return this.developpeurRepository.save(partial).then((v) => developpeurEquipe.new(v));
    }

    async findDeveloperEquipeById(idEquipe){
        return  (await this.developpeurRepository.find({
            where: {
                idEquipe: idEquipe
            }
        })).map((e) => User.new(e.idDeveloppeur))
    }

    async getAllDeveloperTeamByIdDeveloper(idDeveloppeur){
        return(
            await this.developpeurRepository.find({
                idDeveloppeur: idDeveloppeur
            })
        ).map((e) => developpeurEquipe.new(e))
    }

    async getAllEquipeProjectByIdEquipe(idEquipe){
        return(
            await this.EquipeProjetRepository.find({
                idEquipe: idEquipe
            })
        ).map((e) => EquipeProjet.new(e))
    }

    async RemoveDeveloperonEquipe(idDeveloppeur){
        return this.developpeurRepository.delete({idDeveloppeur: idDeveloppeur});
    }

    async findDeveloperEquipe(idEquipe,idDeveloper):Promise<developpeurEquipe>{
        return(
            await this.developpeurRepository.findOne({
                idEquipe: idEquipe,
                idDeveloppeur: idDeveloper
            }).then((v) => developpeurEquipe.new(v)).catch()
        )
    }

    async ChefEquipe(idEquipe){
        return (
            await this.developpeurRepository.findOne({
                idEquipe: idEquipe,
                chefEquipe: true
            }).then((v) => developpeurEquipe.new(v)).catch()
        )
    }

    async GetAllChef(){
        return (
            await this.developpeurRepository.find({
                chefEquipe: true
            })
        ).map((e) => developpeurEquipe.new(e))
    }

    async EquipeDeveloppeurPourUnId(idEquipe){
        return (
            await this.developpeurRepository.find({
                idEquipe: idEquipe
            })
        ).map((e) => developpeurEquipe.new(e))
    }

    async updateChefDeveloperTeam(dv: developpeurEquipe,idEquipe){
        (await this.EquipeDeveloppeurPourUnId(idEquipe)).forEach((e) => {
            console.log(e.chefEquipe == true)
             if(e.chefEquipe == true){
                e.chefEquipe = false
                this.developpeurRepository.save(e)
             }
                 
        })
            dv.chefEquipe = true
        return this.developpeurRepository.save(dv).then((v) => developpeurEquipe.new(v));
    }
}