import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { developpeurEquipe } from "src/domain/entities/developpeur_equipe.entity";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { Projet } from "src/domain/entities/projet.entity";
import { DeveloppeurEquipeActions } from "./developpeur_equipe.actions";
import { developpeurEquipeService } from "./developpeur_equipe.services";


@Module({
    imports: [TypeOrmModule.forFeature([developpeurEquipe,EquipeProjet])],
    exports: [TypeOrmModule, developpeurEquipeService, DeveloppeurEquipeActions],
    providers: [developpeurEquipeService, DeveloppeurEquipeActions], 
})
export class developpeurEquipeModule {}