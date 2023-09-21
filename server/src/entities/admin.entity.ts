import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class admin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    pass: string;
}