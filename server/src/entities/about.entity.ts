import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class about {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    language: string;
    @Column()
    text: string;
}