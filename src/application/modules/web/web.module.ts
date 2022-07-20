import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import * as session from 'express-session';
import * as sqlite from 'better-sqlite3';
import { WebLoginController } from "./controllers/auth/web.login.controller";
import { AuthModule } from "src/domain/module/auth/auth.module";
import { UserModule } from 'src/domain/module/user/user.module';
import { webDashboardController } from "./controllers/web.dashboard.controller";
import { dashboardModule } from "src/domain/module/dashboard/dashboard.module";
import { softwareDeveloperController } from "./controllers/web.softwaredeveloper.controller";
import { webProjectPlan } from "./controllers/web.projectPlan.controller";
import { tachecontroller } from "./controllers/web.taches.controller";
import { Projetcontroller } from "./controllers/projet.controller";
import { ProjetModule } from "src/domain/module/projet/projet.module";
import { ProjectPlanModule } from "src/domain/module/EtatAvancement/projectplan.module";
import { createTeamController } from "./controllers/web.addteam.controller";
import { developerModule } from "src/domain/module/softwaredeveloper/softwaredeveloper.module";
import { APP_FILTER } from "@nestjs/core";
import { GlobalErrorFilter } from "src/global.error-filters";
import { TeamModule } from "src/domain/module/team/team.module";
import { addDeveloperTeamcontroller } from "./controllers/adddeveloperTeam.controller";
import { developpeurEquipeModule } from "src/domain/module/developpeur_equipe/developpeur_equipe.module";
import { TacheModule } from "src/domain/module/tache/tache.module";


@Module({
    imports: [
      AuthModule, 
      UserModule,
      dashboardModule, 
      ProjetModule,
      ProjectPlanModule,
      developerModule,
      TeamModule,
      developpeurEquipeModule,
      TacheModule,
    ],
    controllers: [
      WebLoginController,
      webDashboardController,
      softwareDeveloperController,
      webProjectPlan,
      tachecontroller,
      Projetcontroller,
      createTeamController,
      addDeveloperTeamcontroller,
    ],      
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
    ],
})
export class WebModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      const db = new sqlite('sessions.db', { verbose: console.log });
      const SqliteStore = require("better-sqlite3-session-store")(session)
      consumer
        .apply(
          session({
            secret: 'my-secret',
            resave: false,
            store: new SqliteStore({
              client: db,
              expired: {
                clear: true,
                intervalMs: 900000, //ms = 15min
              },
            }),
            saveUninitialized: false,
          }),
        )
        .forRoutes('web');
    }
  }