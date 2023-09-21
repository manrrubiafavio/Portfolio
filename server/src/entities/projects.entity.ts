import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class projects {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column('text')
    description: string;
    @Column({ nullable: true })
    video: string;
    @Column('text', { array: true }) 
    links: string[];
    @Column()
    language: string;
}