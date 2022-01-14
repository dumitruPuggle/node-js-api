import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({name: "users"})
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    pwd!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    location!: string;

    @Column()
    position!: string;
}