import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import createProjetDto from "src/domain/dto/createproject.dto";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { ProjetActions } from "src/domain/module/projet/projet.actions";

@Controller('new')
export class createProjectController{
    constructor(
        protected projetActions: ProjetActions
    ){}

@Guest()
@Get('projet')
@Render('partials/createprojet')
async viewPage(){
    return
}
// @Guest()
// @Post('projet')
// async createProject(@Body() dto: createProjetDto, @Res() res ){
//     await this.projetActions.createProjet(dto)
//     return res.redirect('/new/project')
// }
}