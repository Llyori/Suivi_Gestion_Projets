import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import createUserDto from './domain/dto/user_create.dto';
import { Public } from './domain/module/auth/is.public.decorators';

@Controller()
export class AppController {
  [x: string]: any;
  //constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Render('web/auth/login')
  root() {
    return { message: 'Hello world how are you!' };
  }

  @Post('create')
  //@Render('auth/login')
  //@HttpCode(200)
  //@UsePipes(ValidationPipe)
  form(@Body() dto: createUserDto){
      console.log(dto)
  }
}
