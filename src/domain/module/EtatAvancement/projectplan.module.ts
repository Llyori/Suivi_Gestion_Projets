import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Projet } from "src/domain/entities/projet.entity";
import { Tache } from "src/domain/entities/tache.entity";
import { ProjetService } from "../projet/projet.service";
import { ProjectPlanActions } from "./projectplan.actions";
import { ProjectPlanService } from "./projectplan.service";

@Module({
    controllers: [],
  imports: [TypeOrmModule.forFeature([Tache,Projet])],
  exports: [TypeOrmModule, ProjectPlanService, ProjectPlanActions],
  providers: [ProjectPlanService, ProjectPlanActions],
})
export class ProjectPlanModule {}