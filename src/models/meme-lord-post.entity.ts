import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MemeLordPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    command: string;

    @Column()
    triggerMessage: string;

    @Column()
    triggerResponse: string;

    @Column('datetime')
    dateTime: string;

    @Column()
    attachmentUrl: string;
}
