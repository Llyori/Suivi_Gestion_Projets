import { Body, Controller, Get, Param, ParseIntPipe, Post, Render, Res } from "@nestjs/common";
import { IsUUID4 } from "@nestjsi/class-validator";
import createProjetDto from "src/domain/dto/createproject.dto";
import createProjectTeam from "src/domain/dto/createProjectTeam.dto";
import { Projet } from "src/domain/entities/projet.entity";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { DeveloppeurEquipeActions } from "src/domain/module/developpeur_equipe/developpeur_equipe.actions";
import { ProjectPlanActions } from "src/domain/module/EtatAvancement/projectplan.actions";
import { ProjetActions } from "src/domain/module/projet/projet.actions";
import { SoftwaredeveloperActions } from "src/domain/module/softwaredeveloper/softwaredeveloper.actions";
import { TacheActions } from "src/domain/module/tache/tache.actions";
import { TeamActions } from "src/domain/module/team/team.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('dash')
export class Projetcontroller{
    
    constructor(
    protected projetActions: ProjetActions,
    protected projectplanAction: ProjectPlanActions,
    protected sfActions: SoftwaredeveloperActions,
    protected tActions: TeamActions,
    private TacheAction: TacheActions,
    private developpeurEquipeActions: DeveloppeurEquipeActions,
    protected userAction: UserActions
    //protected projetu: Projet
    ) {}

@Guest()
@Get('pro/:uuid')
@Render('dashboard/projet')
async getTache(@Param('uuid')uuid){
    //console.log(await this.developpeurEquipeActions.GetAllChef())
    return{
        projects: await this.projetActions.getAllProjects(),
        EquipeProjet: await this.tActions.GetAllEquipeProjet(),
        chef: await this.developpeurEquipeActions.GetAllChef(),
        user: await this.userAction.findUSerByUuid(uuid),
    }; 
}

@Guest()
@Get('removeProject/:idProjet/:uuid')
async DropProject(@Param('idProjet')idProjet,@Param('uuid')uuid, @Res() res){
    await this.projetActions.removeProjet(idProjet)
    return res.redirect(`/dash/pro/${uuid}`)
}

@Guest()
@Get('planification/project/:idProjet/:uuid/:idEquipe')
@Render('dashboard/taches')
async CheckProject (@Param('idProjet', ParseIntPipe) idProjet:number,
                    @Param('idEquipe') idEquipe,
                    @Param('uuid')uuid){
    return{
        projet: await this.projetActions.getProject(idProjet),
        tasks: await this.projectplanAction.getAllTasks(idProjet),
        developers: await this.developpeurEquipeActions.getDeveloperByEquipe(idEquipe),
        teams: await this.tActions.getAllTeam(),
        user: await this.userAction.findUSerByUuid(uuid),
        idEquipe: await idEquipe,
    };
}

@Guest()
@Get('listTask/:idProjet/:uuid')
@Render('dashboard/TaskOfProject')
async ViewPage (@Param('idProjet', ParseIntPipe) idProjet:number, @Param('uuid')uuid){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    };
}
@Guest()
@Get('listTache/:idProjet/:uuid')
@Render('dashboard/DashDeveloper/listTask')
async lPage (@Param('idProjet', ParseIntPipe) idProjet:number,@Param('uuid')uuid:string){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    };
}

@Guest()
@Get('EtatlistTache/:idProjet/:uuid')
@Render('dashboard/DashDeveloper/EtatTask')
async ViPage (@Param('idProjet', ParseIntPipe) idProjet:number,@Param('uuid')uuid:string){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    };
}

@Guest()
@Get('Etat/:idTache/:uuid')
@Render('dashboard/DashDeveloper/etatAvancement')
async EtatAvancement(@Param('idTache')idTache:number,@Param('uuid')uuid:string){
    return{
        Task: await this.projectplanAction.getTaskById(idTache),
        DetailTache: await this.TacheAction.findAllTacheDetailOfTacheById(idTache),
        user: await this.userAction.findUSerByUuid(uuid),
    };
}

@Guest()
@Get('Update/:idProjet')
async UpdatePage (@Param('idProjet') idProjet:number, @Res() res){
    let val = 'En cours'
    await this.projetActions.UpdateStatutOfProject(await this.projetActions.getProject(idProjet),val)
    return res.redirect(`/dash/pro`)
}

@Guest()
@Get('printTask/:idProjet')
@Render('dashboard/etat/printTask')
async PrintProject(@Param('idProjet')idProjet){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
    }; 
}

@Guest()
@Get('ETaskA/:idProjet/:uuid')
@Render('dashboard/task')
async EProject(@Param('idProjet')idProjet, @Param('uuid')uuid){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    }; 
}

@Guest()
@Get('ETask/:idProjet/:uuid')
@Render('dashboard/DashDeveloper/Etask')
async EtatProject(@Param('idProjet')idProjet,@Param('uuid')uuid:string){
    return{
        projet: await this.projetActions.getProject(idProjet),
        Tasks: await this.projectplanAction.getAllTasks(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    }; 
}

@Guest()
@Get('projet')
@Render('dashboard/projectPlan')
async getProject(){
    return{
        projects: await this.projetActions.getAllProjects()
    }; 
}

@Guest()
@Get('pProjet/:uuid')
@Render('dashboard/etatAvancement')
async PagegetProject(@Param('uuid')uuid){
    return{
        projects: await this.projetActions.getAllProjects(),
        user: await this.userAction.findUSerByUuid(uuid),
    }; 
}

@Guest()
@Post('pro')
async createProject(@Body() dto: createProjetDto, @Res() res ){
    await this.projetActions.createProjet(dto)
    return res.redirect(`/dash/pro/${dto.uuid}`)
}

@Guest()
@Get('soumettre/:idProjet/:uuid')
@Render('dashboard/soumettreprojet')
async Soumettre(@Param('idProjet')idProjet, @Param('uuid')uuid){
    return {
        teams: await this.tActions.getAllTeam(),
        projet: await this.projetActions.getProject(idProjet),
        user: await this.userAction.findUSerByUuid(uuid),
    }
}

@Guest()
@Post('teamProject')
async createTeamProject(@Body() dto: createProjectTeam, @Res() res ){
    await this.projetActions.CreateEquipeProjet(await this.projetActions.getProject(dto.idProjet), dto)
    return res.redirect(`/dash/pro/${dto.uuid}`)
}
    

}