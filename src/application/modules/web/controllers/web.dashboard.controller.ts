import { Controller, Get, Param, Render } from "@nestjs/common";
import { stringify } from "querystring";
import { AuthUser } from "src/domain/module/auth/auth-user.decorator";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { dashboardService } from "src/domain/module/dashboard/dashboard.service";
import { DeveloppeurEquipeActions } from "src/domain/module/developpeur_equipe/developpeur_equipe.actions";
import { ProjetActions } from "src/domain/module/projet/projet.actions";
import { SoftwaredeveloperActions } from "src/domain/module/softwaredeveloper/softwaredeveloper.actions";
import { TacheActions } from "src/domain/module/tache/tache.actions";
import { TeamActions } from "src/domain/module/team/team.actions";
import { UserActions } from "src/domain/module/user/user.actions";

@Controller('web/dash')
export class webDashboardController{
    
    constructor(
        //protected authService: dashboardService
        private da: UserActions,
        private sd: SoftwaredeveloperActions,
        private developpeurEquipeActions: DeveloppeurEquipeActions,
        private teamAction: TeamActions,
        private td: TacheActions,
        private projetActions: ProjetActions,
    ) {}

@Get('page/:uuid')
@Render('dashboard/index')
async viewLoginPage(@AuthUser() user, @Param('uuid')uuid) {
    
    let tde = 0, tdt=0; 
    let im = 0;
    let i = 0, a = 0;
    let pa = 0, ps = 0, pc = 0, pt = 0;
    (await this.teamAction.getAllTeam()).forEach((e) =>{
        if(e.statut == true){
            i++
        }else{
            a++
        }
    })
    let t = [i,a];
    let tdr = [];
    (await this.td.GetAllDetailTache()).forEach(async (e) =>{
        if(e.statut == 'En Cours')
            tde++;
        else if(e.statut == 'termine')
            tdt++;
        tdr = [tde,tdt]; 
    });
     
    (await this.projetActions.getAllProjects()).forEach((e) =>{
        if(e.statut == 'En Attente')
            pa++
        else if(e.statut == 'En cours')
            pc++
        else if(e.statut == 'soumis')
            ps++;
        else if(e.statut == 'termine')
            pt++;
    })
    let pj = [pa,pc,ps,pt];
    let perso = [];
    let kk = await this.sd.getAllSoftwaredevelopers();
    kk.forEach(async (e) =>{
        if(im > (kk.length - 6)){
            perso.push(e)
            im++;
        }
        else
            im++;
    })
    // (await (await this.sd.getAllSoftwaredevelopers())).forEach((e) =>{
    //     while(im < 7){
    //         perso.push(e);
    //         im++;
    //     }
    // });
    
    return{
        role: await this.da.GetAllRole(),
        personnel: await (await this.sd.getAllSoftwaredevelopers()).length,
        chef: await (await this.developpeurEquipeActions.GetAllChef()).length,
        personnelAd: await (await this.da.GetUserByRole(1)).length,
        Equipes: await (await this.teamAction.getAllTeam()).length,
        t: t,
        i: perso,
        TacheDetail: await (await this.td.GetAllDetailTache()).length,
        tdr: tdr,
        projects: await (await this.projetActions.getAllProjects()).length,
        pj: pj,
        user: await this.da.findUSerByUuid(uuid),
        // developer : await this.da.GetUserByRole('Developpeur'),
        // admin: await this.da.GetUserByRole('Administrateur')
    }
}

@Get('pagedev/:uuid/:idDev')
@Render('dashboard/indexdev')
async LoginPage(@Param('uuid')uuid:string, @Param('idDev')idDev) {
    let num = [];
    let numa = 0, numi = 0;
        (await this.developpeurEquipeActions.FindAllEquipeDeveloppeurById(idDev)).forEach((e) => {
            num.push(e.idEquipe)
            if(e.idEquipe.statut == true)
                numa ++
            else
                numi ++
        })

    let ti = [];
    let psea = [];
    let peas = 0, peae = 0, peat = 0;
    (await this.developpeurEquipeActions.FindAllEquipeDeveloppeurById((await this.da.findUSerByUuid(uuid)).id)).forEach(async (e) =>{
        (await this.developpeurEquipeActions.FindAllEquipeProjetByEquipe(e.idEquipe)).forEach((v) => {
            ti.push(v.idProjet)
            if(v.idProjet.statut == 'En cours')
                peae ++
            else if(v.idProjet.statut == 'soumis')
                peas ++
            else 
                peat ++
        })
        psea = [peas,peae,peat];
    })
    
    
    // await this.TacheAction.findAllTacheDetailOfTacheById(idTache),

    let q = [];
    let ul = 0, il = 0;
    (await this.td.findAllTacheByUSer((await this.da.findUSerByUuid(uuid)).id)).forEach((e) =>{
        if(e.statut == 'En Cours')
            ul ++
        else if(e.statut == 'termine')
            il ++
        q = [ul,il]
    })
   

    let kr = [];
    let ty = [];
    let op=0,oi=0,ol=0;
    (await this.td.findAllTacheByUSer((await this.da.findUSerByUuid(uuid)).id)).forEach(async (e) =>{
        (await this.td.findAllTacheDetailOfTacheById(e.idTache)).forEach((v) =>{
            kr.push(v)
            if(v.statut == 'En Attente')
                op ++
            if(v.statut == 'En Cours')
                oi ++
            else if(v.statut == 'termine')
                ol ++
            ty = [op,oi,ol]
        })
    })
    
    
    

    let y = [];
    let f=0,r=0;
    let taches = await this.td.findAllTacheByUSer((await this.da.findUSerByUuid(uuid)).id);
    taches.forEach(async (e) =>{
        if(f < taches.length){
            if((e.statut == 'termine') && (y.length < 5)){
                y.push(e)
                f ++
            }
            else if((e.statut == 'En Cours') && (y.length < 5)){
                y.push(e)
                f ++
            }
            else if((e.statut == 'En Attente') && (y.length < 5)){
                y.push(e)
                f ++
            }
            // if(r > (taches.length) - 3){
            //     y.push(e)
            //     r++
            // }else
            //     r++
        }else
            f++
    })
    
    return{
        user: await this.da.findUSerByUuid(uuid),
        DevEquipes: num,
        projets: ti.length,
        numa: numa,
        numi: numi,
        psea: psea,
        taches: taches,
        q:q,
        y:y,
        td: kr.length,
        ty: ty,
    };
}

}