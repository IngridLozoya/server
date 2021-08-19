import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:50})
    name: string;

    @Column({length:200})
    description: string;

    @Column({length: 200})
    picture: string;

}
