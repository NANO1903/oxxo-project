import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
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

    @OneToOne(() => Location)
    location: Location;
}
