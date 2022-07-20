import { Body, Controller, Post } from "@nestjs/common";
import createSoftwareDevDto from "src/domain/dto/createsoftwareDev.dto";
import { User } from "src/domain/entities/user.entity";
import { AuthUser } from "src/domain/module/auth/auth-user.decorator";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('web/:inst/')
export class webSoftwareDevActionController{
    constructor(private softwareDevActions: UserActions) {}

    @Post('dev/create')
    async createSoftwareDev(@Body() dto:createSoftwareDevDto, @AuthUser() user:User){
        await this.softwareDevActions
    }
}