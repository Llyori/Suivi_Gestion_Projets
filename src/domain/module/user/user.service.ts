import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createHmac, randomBytes } from "crypto";
import { Agent } from "http";
import createRoleDto from "src/domain/dto/createRole.dto";
import createUserDto from "src/domain/dto/user_create.dto";
import { Projet } from "src/domain/entities/projet.entity";
import { Role } from "src/domain/entities/role.entity";
import { User, UserStatus } from "src/domain/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>
    
  ) {}


  checkStatus(user: User) {
    return user.status == UserStatus.Active;
  }

  async createUser(partial: Partial<User>): Promise<User> {
    return this.userRepository.save(partial).then((v) => User.new(v));
  }

  async createRole(partial: Partial<Role>): Promise<Role> {
    return this.RoleRepository.save(partial).then((v) => Role.new(v))
  }

  async FindAllRole(idRole){
    return (
      await this.RoleRepository.findAndCount({
        idRole: idRole
      })
    )
  }


  async GetAllRole(){
    return (
      await this.RoleRepository.find()
    ).map((e) => Role.new(e))
  }


  // async RegisterUser(user: Partial<User>): Promise<User> {
  //   const created = await this.userRepository.save(user);

  //   //  const userCreatedEvent = new userCreatedEvent();
  //   //  userCreatedEvent.user = created;
  //   //  userCreatedEvent.name = created.name;
  //   //  userCreatedEvent.role = created.role;
     
  //   //  this.eventEmitter.emit('User.created', userCreatedEvent);

  //   return User.new(created);
  // }

  findByUuid(uuid: string): Promise<User> {
    return this.userRepository.findOne({
      uuid: uuid,
    });
  }

  async findAllUserByRole(role){
    return(
      await this.userRepository.find({
        role: role,
      })
    ).map((e) => User.new(e));
  }

  async UpdateUser(dto:createUserDto, user:User){
    user.name = dto.name,
    user.role = dto.role,
    user.telephone = dto.telephone,
    user.status = dto.status,
    await this.userRepository.save(user).then((v) => User.new(v)).catch();
  }
  

  RemoveUser(uuid: string) {
    return this.userRepository.delete({
      uuid: uuid,
    });
  }

  async RemoveRole(nomRole:string){
    return this.RoleRepository.delete({
      nomRole: nomRole
    });
  }

  async findRoleById(idRole){
    return(
      await this.RoleRepository.findOne({
        idRole: idRole
      }).then((v) => Role.new(v))
    )
  }

  async updateRole(role: Role, dto: createRoleDto){
    role.nomRole = dto.nomRole
    await this.RoleRepository.save(role).then((v) => Role.new(v)).catch();
  }

  generateSalt(length) {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  hashPassword(password: string): { salt: string; passwordHash: string } {
    const salt = this.generateSalt(8);
    const hashedPassword = this.sha512(password, salt);
    return hashedPassword;
  }

  checkPassword(user: User, password: string) {
    return this.sha512(password, user.salt).passwordHash == user.password;
  }

  sha512(password, salt) {
    const hash = createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value,
    };
  }


  async findByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    const v = await this.userRepository.findOne({
      telephone: phoneNumber,
    });
    return User.new(v);
  }

  


  // findAllAgencyUser(agency: Agency) {
  //   return this.userRepository.find({
  //     agency: agency,
  //   });
  // }


}
