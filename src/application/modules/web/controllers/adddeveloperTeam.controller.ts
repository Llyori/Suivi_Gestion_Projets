import { Body, Controller, Get, Param, Render, Res } from "@nestjs/common";
import createProjectTeam from "src/domain/dto/createProjectTeam.dto";
import { User } from "src/domain/entities/user.entity";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { DeveloppeurEquipeActions } from "src/domain/module/developpeur_equipe/developpeur_equipe.actions";
import { SoftwaredeveloperActions } from "src/domain/module/softwaredeveloper/softwaredeveloper.actions";
import { TeamActions } from "src/domain/module/team/team.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('developer/team')
export class addDeveloperTeamcontroller{

    constructor(
        private developerActions: SoftwaredeveloperActions,
        private developpeurEquipeActions: DeveloppeurEquipeActions,
        private teamActions: TeamActions,
        private userActions: UserActions
    ){}

    @Guest()
    @Get('listdev/:idEquipe/:uuid')
    @Render('dashboard/listdeveloperteam')
    async viewPage(@Param('idEquipe')idEquipe: number, @Param('uuid')uuid){
        //console.log((await this.developpeurEquipeActions.CHefEquipe(idEquipe)).idDeveloppeur)
        return {
            chef: (await this.developpeurEquipeActions.CHefEquipe(idEquipe)),
            teams: await this.developpeurEquipeActions.getDeveloperByEquipe(idEquipe),
            idEquipe: idEquipe,
            user: await this.userActions.findUSerByUuid(uuid),
        };
    }

    @Guest()
    @Get('removedev/:idDeveloppeur/:idEquipe/:uuid')
    async RemovePage(@Param('idDeveloppeur')idDeveloppeur, 
                    @Param('idEquipe')idEquipe, @Param('uuid')uuid, @Res() res){
        await this.developpeurEquipeActions.RemoveDevOnTeam(idDeveloppeur)
        return res.redirect(`/developer/team/listdev/${idEquipe}/${uuid}`)
    }

    @Guest()
    @Get('list/:idEquipe/:uuid')
    @Render('dashboard/addDeveloperTeam')
    async listDeveloper(@Param('idEquipe')idEquipe: number, @Param('uuid')uuid) {
        let num = [];
        (await this.developpeurEquipeActions.getDeveloperByEquipe(idEquipe)).forEach((e) =>{
            num.push(e.id)
        })
        return{
            idEquipe: idEquipe,
            teams: await this.developerActions.getAllSoftwaredevelopers(),
            developers: num,
            user: await this.userActions.findUSerByUuid(uuid),
        };
    }

    @Guest()
    @Get('affect/project/developer')
    async AffectProjectTeam(@Body() dto: createProjectTeam, @Res() res){
        await this.teamActions.createProjectTeam(dto)
        return res.redirect('/dash/projet')
    }

    @Guest()
    @Get('listdeveloper/:uuid')
    @Render('dashboard/etat/listDeveloper')
    async Page(@Param('uuid')uuid){
        return{
            resultat: await this.developerActions.getAllSoftwaredevelopers(),
            Role: await this.userActions.GetAllRole(),
            user: await this.userActions.findUSerByUuid(uuid),
        } 
    }

    @Guest()
    @Get('add/:idEquipe/:idUser/:uuid')
    async createDeveloppeurEquipe (
    @Param('idEquipe')idEquipe:number,
     @Param('idUser')  idUser:number, @Param('uuid')uuid, @Res() res){
        await this.developpeurEquipeActions.createDeveloppeurEquipe(idUser,idEquipe);
        return res.redirect(`/developer/team/list/${idEquipe}/${uuid}`)
    }

}