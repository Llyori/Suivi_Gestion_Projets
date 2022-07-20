import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class SoftwaredeveloperService{
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}

    async findAllDevelopers(){
        return(
            await this.userRepository.find()
        ).map((e) => User.new(e));
    }

    async findDeveloperById(iduser){
        return (
            await this.userRepository.findOne({
                id: iduser
            }).then((v) => User.new(v))
        );
    }

    // async NbreUserbyRole(idRole){
    //     return(
    //         await this.userRepository.findAndCount({
    //             role: idRole
    //         })
    //     )
    // }

    async findAllDeveloperByRole(idRole){
        return (
            await this.userRepository.find({
                role: idRole
            })
        ).map((e) => User.new(e))
    }
}