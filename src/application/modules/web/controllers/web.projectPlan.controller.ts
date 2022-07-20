import { Body, Controller, Get, Param, ParseIntPipe, Post, Render, Res } from "@nestjs/common";
import { get } from "http";
import CreateTacheDto from "src/domain/dto/createtache.dto";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { ProjectPlanActions } from "src/domain/module/EtatAvancement/projectplan.actions";
import { ProjectPlanService } from "src/domain/module/EtatAvancement/projectplan.service";
const MENU_ID = 'Manage_Agent';

@Controller('plan')
export class webProjectPlan{
    constructor(
        protected projectplanAction: ProjectPlanActions,
        protected projectplanService: ProjectPlanService
    ) {}

    @Guest()
    @Get('project')
    @Render('dashboard/projectPlan')
    async actionPlanProject() {
        return 
    }

    @Guest()
    @Post('project')
    async createProjectPlan(@Body() dto: CreateTacheDto, @Res() res ) {
        // console.log(idEquipe)
        await this.projectplanAction.createTache(dto)
        return  res.redirect(`/dash/planification/project/${dto.idProjet}/${dto.uuid}/${dto.idEquipe}`)
    }

    @Guest()
    @Get('soumettreProjet/:idProjet/:uuid/:idEquipe')
    async soumettre(@Param('idProjet')idProjet,@Param('uuid')uuid,@Param('idEquipe')idEquipe, @Res() res){
        await this.projectplanAction.UpdateStatutTacheProjet(idProjet);
        return res.redirect(`/team/listProject/${idEquipe}/${uuid}/true`)
    }

    
    @Guest()
    @Get('removeTask/:idTache/:idProjet/:uuid/:idEquipe')
    async  DeleteTask (@Param('idTache')idTache: number,
                       @Param('idProjet')idProjet: number,
                       @Param('idEquipe')idEquipe: number,
                       @Param('uuid')uuid:string, @Res() res){
        await this.projectplanAction.RemoveTask(idTache)
        return  res.redirect(`/dash/planification/project/${idProjet}/${uuid}/${idEquipe}`)
    };

}