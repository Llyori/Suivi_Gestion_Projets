import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Projet{

    constructor(partial: Partial<Projet>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<Projet>): Projet | undefined {
        if (!partial) return undefined;
        return new Projet(partial);
      }

    @PrimaryGeneratedColumn()
    idProjet: number;

    @Column()
    idAdmin: number;

    @Column()
    nomClient: string;

    @Column()
    nomProjet: string;

    @Column()
    libelle: string;
    
    @Column()
    dateFinProjet: string;

    @Column()
    statut: string;

    @Column({
      default: 0,
    })
    progession: number;

}