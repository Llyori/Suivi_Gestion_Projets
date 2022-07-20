import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/domain/entities/user.entity";
import { SoftwaredeveloperActions } from "./softwaredeveloper.actions";
import { SoftwaredeveloperService } from "./softwaredeveloper.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule, SoftwaredeveloperService, SoftwaredeveloperActions],
    providers: [SoftwaredeveloperService, SoftwaredeveloperActions], 
})
export class developerModule {}