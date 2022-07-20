import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { Projet } from "src/domain/entities/projet.entity";
import { ProjetActions } from "./projet.actions";
import { ProjetService } from "./projet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Projet,EquipeProjet])],
    exports: [TypeOrmModule, ProjetService, ProjetActions],
    providers: [ProjetService, ProjetActions], 
})
export class ProjetModule {}