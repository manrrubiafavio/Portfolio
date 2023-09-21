import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class skills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    level: string;
    
}