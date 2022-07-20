import { Body, Controller, Get, Param, ParseIntPipe, Post, Render, Res } from "@nestjs/common";
import { IsUUID4 } from "@nestjsi/class-validator";
import createRoleDto from "src/domain/dto/createRole.dto";
import createUserDto from "src/domain/dto/user_create.dto";
import { Role } from "src/domain/entities/role.entity";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { ProjectPlanActions } from "src/domain/module/EtatAvancement/projectplan.actions";
import { SoftwaredeveloperActions } from "src/domain/module/softwaredeveloper/softwaredeveloper.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('soft')
export class softwareDeveloperController{
    constructor(
        protected    userActions: UserActions,
        protected    sfActions: SoftwaredeveloperActions
    ) {}

@Guest()
@Get('Role/:uuid')
@Render('dashboard/listRoles')
async viewLoginPage(@Param('uuid')uuid){
    return{
        Role: await this.userActions.GetAllRole(),
        user: await this.userActions.findUSerByUuid(uuid),
    }
}

@Guest()
@Get('update/:idRole/:uuid')
@Render('dashboard/Modification')
async updateRole(@Param('idRole')idRole, @Param('uuid')uuid){
    let val = 1
    return{
        val: val,
        role: await this.userActions.findRoleById(idRole),
        user: await this.userActions.findUSerByUuid(uuid),
    }
}

@Guest()
@Post('Modifier')
async Modifier(@Body() dto:createRoleDto,@Res() res){
    await this.userActions.updateRole(await this.userActions.findRoleById(dto.idRole),dto)
    return res.redirect(`/soft/Role/${dto.uuid}`)
}

@Guest()
@Post('Role')
async viewLogPage(@Body() dto:createRoleDto, @Res() res) {
    await this.userActions.createRole(dto);
    return res.redirect(`/soft/Role/${dto.uuid}`)
}

@Guest()
@Get('RemoveRole/:nomRole/:uuid')
async remove(@Param('nomRole')nomRole,@Param('uuid')uuid, @Res() res){
    await this.userActions.RemoveRole(nomRole)
    return res.redirect(`/soft/Role/${uuid}`)
}

@Guest()
@Get('updatePersonel')
@Render('dashboard/UpdatePersonel')
async CheckProject (){
    return{
        teams: await this.sfActions.getAllSoftwaredevelopers()
    };
}

@Guest()
@Get('updateUser/:uuid/:uu')
@Render('dashboard/Modification')
async updateUser(@Param('uuid')uuid,@Param('uu')uu){
    let val = 2
    return{
        users: await this.userActions.findUSerByUuid(uuid),
        user: await this.userActions.findUSerByUuid(uu),
        Role: await this.userActions.GetAllRole(),
        val: val
    }
}

@Guest()
@Post('modifierPersonnel')
async Modif(@Body() dto: createUserDto, @Res() res){
    await this.userActions.UpdateUser(dto, await this.userActions.findUSerByUuid(dto.uuid))
    return res.redirect(`/developer/team/listdeveloper/${dto.uu}`)
}

@Guest()
@Get('RemovePersonel/:uuid/:uu')
async RemoveUser (@Param('uuid') uuid:string,@Param('uu')uu, @Res() res){
    await this.userActions.deleteUser(uuid);
    return res.redirect(`/developer/team/listdeveloper/${uu}`)
}

@Guest()
@Post('dev')
async createUser(@Body() dto: createUserDto, @Res() res  ) {
   await this.userActions.createUser(dto)
    return res.redirect(`/developer/team/listdeveloper/${dto.uuid}`)
}


}