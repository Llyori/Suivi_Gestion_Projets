import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
export enum UserStatus {
    Active = 'Active'
}
@Entity()
export class User {

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<User>): User | undefined {
        if (!partial) return undefined;
        return new User(partial);
      }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column()
    telephone: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, (v) => v.idRole,{
      eager: true,
    })
    @JoinColumn()
    role: Role;

    
    @Column()
    salt: string; // permet d'encrypter le paassword

    
    @Column()
    status: string;


}