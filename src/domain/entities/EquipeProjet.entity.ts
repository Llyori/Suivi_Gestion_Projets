import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Equipe } from "./equipe.entity";
import { Projet } from "./projet.entity";

@Entity()
export class EquipeProjet{

    constructor(partial: Partial<EquipeProjet>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<EquipeProjet>): EquipeProjet | undefined {
        if (!partial) return undefined;
        return new EquipeProjet(partial);
      }

    @PrimaryGeneratedColumn()
    idEquipeProjet:number;

    @ManyToOne(() => Projet, (v) => v.idProjet, {
      eager: true,
    })
    @JoinColumn()
    idProjet: Projet

    @ManyToOne(() => Equipe, (v) => v.idEquipe, {
      eager: true,
    })
    @JoinColumn()
    idEquipe: Equipe;
}