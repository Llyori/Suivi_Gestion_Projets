import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { developpeurEquipe } from "./developpeur_equipe.entity";
import { Projet } from "./projet.entity";

@Entity()
export class Equipe{
    constructor(partial: Partial<Equipe>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<Equipe>): Equipe | undefined {
        if (!partial) return undefined;
        return new Equipe(partial);
      }

    @PrimaryGeneratedColumn()
    idEquipe: number;

    @Column({
      unique:true,
    })
    nomEquipe: string;

    @Column({
      default: true
    })
    statut: boolean;


    
}