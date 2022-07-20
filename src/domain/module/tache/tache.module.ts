import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tache } from "src/domain/entities/tache.entity";
import { TacheDetail } from "src/domain/entities/Tache_Details.entity";
import { TacheActions } from "./tache.actions";
import { TacheService } from "./tache.services";

@Module({
    imports: [TypeOrmModule.forFeature([Tache,TacheDetail])],
    exports: [TypeOrmModule, TacheService, TacheActions],
    providers: [TacheService, TacheActions], 
})
export class TacheModule{}