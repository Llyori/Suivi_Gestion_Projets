import { Injectable } from "@nestjs/common";
import { SoftwaredeveloperService } from "./softwaredeveloper.service";

@Injectable()
export class SoftwaredeveloperActions{
    constructor(
        private developerService: SoftwaredeveloperService,
    ){}

    async getAllSoftwaredevelopers() {
        return await this.developerService.findAllDevelopers();
    }

    async getDeveloper(idUser){
        return await this.developerService.findDeveloperById(idUser)
    }

    async findAllDeveloperByRole(idRole){
        return await this.developerService.findAllDeveloperByRole(idRole)
    }

    // async NbreUserbyRole(idRole){
    //     return await this.developerService.NbreUserbyRole(idRole)
    // }
}