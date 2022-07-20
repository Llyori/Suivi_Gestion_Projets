import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/domain/entities/role.entity";
import { User } from "src/domain/entities/user.entity";
import { UserActions } from "./user.actions";
import { UserService } from "./user.service";


@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([User,Role])],
  exports: [TypeOrmModule, UserService, UserActions],
  providers: [UserService, UserActions],
})
export class UserModule {}
