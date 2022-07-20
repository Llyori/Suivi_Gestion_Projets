import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Projet } from "./projet.entity";
import { User } from "./user.entity";

@Entity()
export class Tache{

    constructor(partial: Partial<Tache>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<Tache>): Tache | undefined {
        if (!partial) return undefined;
        return new Tache(partial);
    }

    @PrimaryGeneratedColumn()
    idTache: number;

    @ManyToOne(() => Projet, (v) => v.idProjet, {
      eager: true,
    })
    @JoinColumn()
    idProjet: Projet;

    @ManyToOne(() => User, (v) => v.id, {
      eager: true,
    })
    @JoinColumn()
    id: User;

    @Column()
    nomTache: string;

    @Column()
    libelle: string;

    @Column()
    dateDebut: string;

    @Column()
    dateFin: string;

    @Column()
    statut: string;

}