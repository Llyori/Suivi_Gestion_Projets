import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{

    constructor(partial: Partial<Role>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<Role>): Role | undefined {
        if (!partial) return undefined;
        return new Role(partial);
      }
      
    @PrimaryGeneratedColumn()
    idRole: number;

    @Column()
    nomRole: string;

}