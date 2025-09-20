import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export class Manager {
    @PrimaryGeneratedColumn("uuid")
    managerId: string;
    @Column("text")
    managerNFullame: string
    @Column("float")
    managerSalary: number;
    @Column({
        type: "text",
        unique: true,
    })
    managerEmail: string;
    @Column({
        type: "text",
        unique: true,
    })
    managerPhoneNumber: string;
}
