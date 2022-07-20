import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tache } from "./tache.entity";
import { User } from "./user.entity";

@Entity()
export class TacheDetail{

    constructor(partial: Partial<TacheDetail>) {
        Object.assign(this, partial);
      }
      static new(partial: Partial<TacheDetail>): TacheDetail | undefined {
        if (!partial) return undefined;
        return new TacheDetail(partial);
      }
      
    @PrimaryGeneratedColumn()
    idTacheDetail: number;

    @ManyToOne(() => Tache, (v) => v.idTache, {
      eager: true,
    })
    @JoinColumn()
    idTache: Tache;

    @Column()
    difficulte: string;

    @Column()
    besoin: string;

    @Column()
    travailFait: string;

    @Column()
    date: string;

    @Column({
      default: null
    })
    statut: string;

    @Column({
      default: null
    })
    commentaire: string;
}