import { Body, Controller, Get, Param, Post, Render, Res } from "@nestjs/common";
import { IsUUID4 } from "@nestjsi/class-validator";
import { async, identity } from "rxjs";
import CreateTeamDto from "src/domain/dto/createteam.dto";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { DeveloppeurEquipeActions } from "src/domain/module/developpeur_equipe/developpeur_equipe.actions";
import { TeamActions } from "src/domain/module/team/team.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('team')
export class createTeamController{
    constructor(
        private teamAction: TeamActions,
        private developpeurEquipeActions: DeveloppeurEquipeActions,
        private userAction: UserActions
    ){}

    @Guest()
    @Get('list/:uuid')
    @Render('dashboard/addteam')
    async viewPage(@Param('uuid')uuid){
        return{
            Equipes: await this.teamAction.getAllTeam(),
            chef: await this.developpeurEquipeActions.GetAllChef(),
            user: await this.userAction.findUSerByUuid(uuid),
        };
    }

    @Guest()
    @Get('chef/add/:idEquipe/:idDeveloper/:uuid')
    async chefEquipe(@Param('idEquipe')idEquipe,@Param('idDeveloper')idDeveloper,@Param('uuid')uuid, @Res() res){
        await this.developpeurEquipeActions.SelectTchiefTeam(await this.developpeurEquipeActions.getOneDeveloperEquipe(idEquipe,idDeveloper),idEquipe)
        return res.redirect(`/developer/team/listdev/${idEquipe}/${uuid}`)
    }

    @Guest()
    @Get('update/:idEquipe/:val/:uuid')
    async Update(@Param('idEquipe')idEquipe,@Param('val')val:boolean,@Param('uuid')uuid, @Res() res){
        await this.teamAction.updateStatutTeam(await this.teamAction.FindTeamById(idEquipe),val)
        return res.redirect(`/team/list/${uuid}`)
    }

    @Guest()
    @Get('listDevTeam/:idEquipe/:uuid')
    @Render('dashboard/DashDeveloper/list')
    async viPage(@Param('idEquipe')idEquipe,@Param('uuid')uuid:string){
        return{
            teams: await this.developpeurEquipeActions.getDeveloperByEquipe(idEquipe),
            user: await this.userAction.findUSerByUuid(uuid)
        };
    }

    @Guest()
    @Get('taskdev/:uuid/:id')
    @Render('dashboard/DashDeveloper/TaskDev')
    async AllTaskDev(@Param('uuid')uuid:string,@Param('id')id){
        let t = [];
        (await this.developpeurEquipeActions.FindAllEquipeDeveloppeurById(id)).forEach( async (e) =>{
            (await this.developpeurEquipeActions.FindAllEquipeProjetByEquipe(e.idEquipe)).forEach((v) => {
               t.push(v.idProjet);
            })
            //tab.push(e.idEquipe.idEquipe)
        })
        //console.log(t);
        return {
            Projets: t,
            user: await this.userAction.findUSerByUuid(uuid) 
        }
    }

    @Guest()
    @Get('listTeam/:idDeveloper/:uuid')
    @Render('dashboard/DashDeveloper/TeamList')
    async Page(@Param('idDeveloper')idDeveloper:number,
               @Param('uuid')uuid:string ){
        let num = [];
        (await this.developpeurEquipeActions.FindAllEquipeDeveloppeurById(idDeveloper)).forEach((e) => {
            num.push(e)
        });
        return{
            DevEquipes: num,
            Equipes: await this.teamAction.getAllTeam(),
            user: await this.userAction.findUSerByUuid(uuid),
        };
    }

    @Guest()
    @Get('listProject/:idEquipe/:uuid/:val')
    @Render('dashboard/DashDeveloper/projectlist')
    async Pages(@Param('idEquipe')idEquipe,@Param('uuid')uuid:string,@Param('val')val:boolean){
        let projets = [];
        (await this.developpeurEquipeActions.FindAllEquipeProjetByEquipe(idEquipe)).forEach((e) => {
            projets.push(e.idProjet)
        })
        return {
            Projets: projets,
            user: await this.userAction.findUSerByUuid(uuid),
            idEquipe: idEquipe,
            var :val
        }
    }
    

    @Guest()
    @Post('add')
    async createTeam(@Body() dto: CreateTeamDto, @Res() res){
        await this.teamAction.createTeam(dto)
        return res.redirect(`/team/list/${dto.uuid}`)
    }

}