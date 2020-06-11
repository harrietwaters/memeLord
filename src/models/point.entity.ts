import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SortingHatUser } from './sorting-hat-user.entity';

@Entity()
export class Point {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: string;

    @Column()
    messageId: string;

    @Column({
        type: 'int',
        default: () => Math.ceil(Math.random() * 1000)
    })
    point: number;

    @ManyToOne(
        _type => SortingHatUser,
        sortingHatUser => sortingHatUser.points
    )
    @JoinColumn({
        name: 'authorId',
        referencedColumnName: 'authorId'
    })
    sortingHatUser: SortingHatUser;
}
