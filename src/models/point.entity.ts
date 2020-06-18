import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { SortingHatUser } from './sorting-hat-user.entity';

@Entity()
export class Point {
    @BeforeInsert()
    private setPoint(): void {
        this.point = Math.ceil(Math.random() * 1000);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: string;

    @Column()
    messageId: string;

    @Column('int')
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
