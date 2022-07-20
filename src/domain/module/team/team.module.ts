import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Equipe } from "src/domain/entities/equipe.entity";
import { EquipeProjet } from "src/domain/entities/EquipeProjet.entity";
import { TeamActions } from "./team.actions";
import { TeamService } from "./team.services";

@Module({
    imports: [TypeOrmModule.forFeature([Equipe,EquipeProjet])],
    exports: [TypeOrmModule, TeamService, TeamActions],
    providers: [TeamService, TeamActions], 
})
export class TeamModule {}