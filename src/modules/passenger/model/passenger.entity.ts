import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'passengers' })
export class Passenger {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column({ nullable: true })
    public middleName: string;

    @Column()
    public lastName: string;
}
