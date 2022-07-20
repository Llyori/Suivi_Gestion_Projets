import { Injectable } from "@nestjs/common";
import createRoleDto from "src/domain/dto/createRole.dto";
import createSoftwareDevDto from "src/domain/dto/createsoftwareDev.dto";
import createUserDto from "src/domain/dto/user_create.dto";
import { Role } from "src/domain/entities/role.entity";
import { User } from "src/domain/entities/user.entity";
import { UserService } from "./user.service";

@Injectable()
export class UserActions{
    constructor(
        private userService: UserService,  
    ){}

    async findUSerByUuid(uuid: string){
        return await this.userService.findByUuid(uuid);
    }

    async UpdateUser(dto:createUserDto, user:User){
        return await this.userService.UpdateUser(dto, user)
    }

    async deleteUser(uuid: string){
        return await this.userService.RemoveUser(uuid);
    }

    async createUser(dto: createUserDto){
        let match
        match = await this.userService.findByPhoneNumber(dto.telephone)
        if(match) {
            throw Error('Ce personnel existe déjà.')
        }
        const password =  this.userService.hashPassword(dto.password)
        return this.userService.createUser({
            name: dto.name,
            password: password.passwordHash,
            salt: password.salt,
            telephone: dto.telephone,
            role: dto.role,
            status: 'Active'
        })
    }

    
    async GetUserByRole(role){
        return await this.userService.findAllUserByRole(role)
    }

    async findRoleById(idRole){
        return this.userService.findRoleById(idRole)
    }

    async updateRole(role: Role, dto:createRoleDto){
        return await this.userService.updateRole(role,dto)
    }

    async FindAllRole(idRole){
        return await this.userService.FindAllRole(idRole)
    }

    async createRole(dto: createRoleDto){
        let match = 0;
        (await this.GetAllRole()).forEach((e) => {
            if (e.nomRole == dto.nomRole){
                throw Error('Ce Statut existe déjà !')
                match = 1;
            }
        })
        if (match == 0)
        {
            return this.userService.createRole({
            nomRole: dto.nomRole
            }) 
        }
    }

    async RemoveRole(nomRole: string){
        return await this.userService.RemoveRole(nomRole)
    }

    async GetAllRole(){
        return this.userService.GetAllRole()
    }
}