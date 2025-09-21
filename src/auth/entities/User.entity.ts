import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;
    @Column({ type: "text", unique: true})
    userEmail: string;
    @Column("text")
    userPassword: string;
}