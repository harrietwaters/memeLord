import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ShitPost {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: string;

    @Column()
    messageContent: string;

    @Column({
        type: 'bigint',
        default: () => Date.now(),
        nullable: true
    })
    datetime: number;

    @Column()
    imageHash: string;
}
