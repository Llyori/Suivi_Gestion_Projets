import { Body, Controller, Get, Param, Post, Render, Res } from "@nestjs/common";
import createDetailTacheDto from "src/domain/dto/createDetailTask.dto";
import { TacheDetail } from "src/domain/entities/Tache_Details.entity";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { ProjectPlanActions } from "src/domain/module/EtatAvancement/projectplan.actions";
import { TacheActions } from "src/domain/module/tache/tache.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('dash')
export class tachecontroller{
    
    constructor(
        protected projectplanAction: ProjectPlanActions,
        private TacheAction: TacheActions,
        private userAction: UserActions
    ) {}

@Guest()
@Get('tache')
@Render('dashboard/taches')
async viewLoginPage() {
    return 
}

@Guest()
@Get('task/:idTache/:uuid')
@Render('dashboard/viewTask')
async viewPage(@Param('idTache')idTache:number, @Param('uuid')uuid){
    //console.log((await this.TacheAction.getTacheById(idTache)).id)
    return {
        task: await this.TacheAction.getTacheById(idTache),
        //developer: await this.userAction.findUSerByUuid((await this.TacheAction.getTacheById(idTache)).uuidDeveloppeur)
        DetailTache: await this.TacheAction.findAllTacheDetailOfTacheById(idTache),
        user: await this.userAction.findUSerByUuid(uuid),
    }
}

@Guest()
@Get('printtask/:idTache/:uuid')
@Render('dashboard/etat/printEtat')
async ProntEtat(@Param('idTache')idTache:number, @Param('uuid')uuid){
    //console.log((await this.TacheAction.getTacheById(idTache)).id)
    return {
        task: await this.TacheAction.getTacheById(idTache),
        //developer: await this.userAction.findUSerByUuid((await this.TacheAction.getTacheById(idTache)).uuidDeveloppeur)
        DetailTache: await this.TacheAction.findAllTacheDetailOfTacheById(idTache),
        user: await this.userAction.findUSerByUuid(uuid),
    }
}

@Guest()
@Get('taski/:idTache/:uuid')
@Render('dashboard/DashDeveloper/Etat')
async viwPage(@Param('idTache')idTache:number,@Param('uuid')uuid:string) {
    //console.log((await this.TacheAction.getTacheById(idTache)).id)
    return {
        task: await this.TacheAction.getTacheById(idTache),
        //developer: await this.userAction.findUSerByUuid((await this.TacheAction.getTacheById(idTache)).uuidDeveloppeur)
        DetailTache: await this.TacheAction.findAllTacheDetailOfTacheById(idTache),
        user: await this.userAction.findUSerByUuid(uuid),
    }
}

@Guest()
@Get('updateonedetail/add/:idTacheDetail/:statut/:uuid')
async UpdateOne(@Param('idTacheDetail')idTacheDetail,@Param('statut')statut:string,@Param('uuid')uuid:string, @Res() res){
    let tache = (await this.TacheAction.FindTacheDetailById(idTacheDetail))
    await this.TacheAction.updateStatutDetailTacheOne(tache, statut)
    return res.redirect(`/dash/taski/${tache.idTache.idTache}/${uuid}`)
}

@Guest()
@Get('rejeterEtat/:idTacheDetail/:uuid/:val')
@Render('dashboard/rejeter')
async RejeterEtat(@Param('idTacheDetail')idTacheDetail,@Param('uuid')uuid:string,@Param('val')Val, @Res() res){
    if(Val == true){
        return{
            task: await this.TacheAction.FindTacheDetailById(idTacheDetail),
            user: await this.userAction.findUSerByUuid(uuid),
            va: 1
        }
    }else{
        return{
            task: await this.TacheAction.FindTacheDetailById(idTacheDetail),
            user: await this.userAction.findUSerByUuid(uuid),
            va: 0
        }
    }
    
}

@Guest()
@Post('rejeterEtat')
async RejeterE(@Body() dto:createDetailTacheDto,@Res() res){
    let tache = (await this.TacheAction.FindTacheDetailById(dto.idTacheDetail))
    await this.TacheAction.rejeterEtat(tache,dto)
    return res.redirect(`/dash/task/${dto.idTache}/${dto.uuid}`)
}

@Guest()
@Get('evolution/:idTache/:uuid')
@Render('dashboard/DashDeveloper/EvolutionTache')
async EvolutionTache(@Param('idTache')idTache,@Param('uuid')uuid:string){
    return{
        task: await this.TacheAction.getTacheById(idTache),
        DetailTache: await this.TacheAction.findAllTacheDetailOfTacheById(idTache),
        user: await this.userAction.findUSerByUuid(uuid),
    }
}

@Guest()
@Get('updatedetail/:idTache/:statut/:uuid')
async Update(@Param('idTache')idTache,@Param('statut')statut:string,@Param('uuid')uuid:string, @Res() res){
    //let tache = (await this.TacheAction.FindTacheDetailById(idTacheDetail))
    await this.TacheAction.updateStatutDetailTache(idTache, statut)
    if (statut == 'En Cours'){
        return res.redirect(`/dash/Etat/${idTache}/${uuid}`)
    }
}

@Guest()
@Get('updateTache/:idTache/:statut/:uuid')
async UpTask(@Param('idTache')idTache,@Param('statut')statut:string,@Param('uuid')uuid:string, @Res() res){
    await this.TacheAction.updateTache((await this.TacheAction.getTacheById(idTache)), statut)
    return res.redirect(`/dash/EtatlistTache/${idTache}/${uuid}`)
}

@Guest()
@Post('avancement')
async avancement(@Body() dto: createDetailTacheDto, @Res() res){
    //console.log(dto.fichier)
    let p =  await this.projectplanAction.getTaskById(dto.idTache)
    await this.TacheAction.createDetailTache(dto);
    return res.redirect(`/dash/Etat/${dto.idTache}/${p.id.uuid}`)
    //Etat/:idTache/:uuid
}


}