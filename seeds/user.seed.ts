import { User, UserStatus } from "../src/domain/entities/user.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from 'typeorm-seeding';
import { Role } from "src/domain/entities/role.entity";

export class userSeed implements Seeder{
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        const et = connection.createEntityManager();
        const UserRepo = em.getRepository<User>(User);
        const RoleRepo = et.getRepository<Role>(Role);
        //  let { salt, passwordHash } = this.userService.hashPassword('Kokodi12');
    
        await RoleRepo.save(
          Role.new({
            nomRole: 'Administrateur'
          })
        )
    
        await UserRepo.save(
          User.new({
            password:
              '238e328e1cc7c47ff58b78f7277687a834ada0c5eff69f205accfdb6a4b9b608381b792be78226f16677a10a280666c860295d6d02495daf5be5d2ddcf82662d',
            salt: 'a33ddd24',
            telephone: 'sa',
            status: UserStatus.Active,
            name: 'Super Admin',
          }),
        );
      }
    
}