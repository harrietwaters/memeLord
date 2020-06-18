import { Column, PrimaryColumn, Entity, ManyToOne, JoinColumn, OneToMany, BeforeInsert } from 'typeorm';
import { MemeHouse } from './meme-house.entity';
import { Point } from './point.entity';

@Entity()
export class SortingHatUser {
    @BeforeInsert()
    private setTime(): void {
        this.lastSortTime = Date.now();
    }

    @PrimaryColumn()
    authorId: string;

    @Column('bigint')
    lastSortTime: number;

    @Column()
    memeHouseId: number;

    @ManyToOne(
        _type => MemeHouse,
        memeHouse => memeHouse.sortingHatUsers
        // { eager: true }
    )
    @JoinColumn({
        name: 'memeHouseId',
        referencedColumnName: 'id'
    })
    memeHouse: MemeHouse;

    @OneToMany(
        _type => MemeHouse,
        memeHouse => memeHouse.sortingHatUsers
    )
    @JoinColumn({
        name: 'authorId',
        referencedColumnName: 'authorId'
    })
    points: Array<Point>;
}
