import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class ShitPost {
    @BeforeInsert()
    private setTime(): void {
        this.datetime = Date.now();
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: string;

    @Column()
    messageContent: string;

    @Column('bigint')
    datetime: number;

    @Column()
    imageHash: string;
}
