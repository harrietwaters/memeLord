import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { SortingHatUser } from './sorting-hat-user.entity';

@Entity()
export class MemeHouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    houseImage: string;

    @OneToMany(
        _type => SortingHatUser,
        sortingHatUser => sortingHatUser.memeHouse,
        { eager: true }
    )
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'memeHouseId'
    })
    sortingHatUsers: Array<SortingHatUser>;
}
