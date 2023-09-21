import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class contact {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    phone: string;
    @Column()
    email: string;
    @Column()
    whatsapp: string;
}