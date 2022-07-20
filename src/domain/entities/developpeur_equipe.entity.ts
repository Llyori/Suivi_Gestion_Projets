import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "./equipe.entity";
import { User } from "./user.entity";

@Entity()
export class developpeurEquipe{
    constructor(partial: Partial<developpeurEquipe>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<developpeurEquipe>): developpeurEquipe | undefined {
        if (!partial) return undefined;
        return new developpeurEquipe(partial);
      }
    @PrimaryGeneratedColumn()
    idDeveloppeurEquipe: number;

    @ManyToOne(() => Equipe, (v) => v.idEquipe, {
      eager: true,
    })
    @JoinColumn()
    idEquipe: Equipe;

    @ManyToOne(() => User, (v) => v.id, {
      eager: true,
    })
    @JoinColumn()
    idDeveloppeur: User;

    @Column({
      default: false,
    })
    chefEquipe: boolean;


}
