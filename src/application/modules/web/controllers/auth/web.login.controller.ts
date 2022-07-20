import { Controller, Get, HttpCode, HttpStatus, Post, Render, Res, Session, UseGuards } from "@nestjs/common";
import { session } from "passport";
import { User } from "src/domain/entities/user.entity";
import { AuthUser } from "src/domain/module/auth/auth-user.decorator";
import { AuthService } from "src/domain/module/auth/auth.service";
import { LocalAuthGuard } from "src/domain/module/auth/guards/local-auth.guard";
import { Guest } from "src/domain/module/auth/guest.decorator";
import { Public } from "src/domain/module/auth/is.public.decorators";

@Controller('web/auth')
export class WebLoginController {
    constructor(
        protected authService: AuthService
    ) {}

@Guest()
@Post('login')
@UseGuards(LocalAuthGuard)
@HttpCode(HttpStatus.OK)
async login(@AuthUser() user: User, @Session() session, @Res() res) {
    const token = this.authService.login(user);
    session.token = token.tokens.access_token   
    //console.log(session)
    if(user.role.nomRole == 'Administrateur'){
        return res.redirect(`/web/dash/page/${user.uuid}`)
    }
    else
        return res.redirect(`/web/dash/pagedev/${user.uuid}/${user.id}`)
}

@Get('logout')
logout(@Session() session, @AuthUser() User, @Res() res){
    session.destroy((e) => {
        console.log(e)
    })
    return res.redirect(`/web/auth/login`)
}

@Guest()
@Get('logine')
@Render('web/auth/log')
async LoginPage() {
    return 
}

@Guest()
@Get('login')
@Render('web/auth/login')
async viewLoginPage() {
    return 
}

}