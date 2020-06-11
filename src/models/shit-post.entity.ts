import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm';

@Entity()
export class ShitPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string;

    @Column()
    messageContent: string;

    @Column('datetime')
    @Column({
        type: 'int',
        default: () => Date.now()
    })
    dateTime: string;

    @Column()
    imageHash: string;
}
