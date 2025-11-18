import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Manager } from "../../manager/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "../../employees/entities/employee.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("increment")
    locationId: number | null;

    @Column("text")
    locationName: string;

    @Column("text")
    locationAddress: string;

    @Column("simple-array")
    locationLatLng: number[];

    @OneToOne(() => Manager, {
        nullable: true,
        eager: true,
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;

    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId",
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
