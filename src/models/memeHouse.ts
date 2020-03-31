import { sequelize } from '../lib/db'
import * as Sequelize from 'sequelize'
import { SortingHatUser } from './sortingHatUser'

export class MemeHouse extends Sequelize.Model {
  public id!: number;
  public name!: string;
  public houseImage!: string;
  public SortingHatUsers!: SortingHatUser[];
}
MemeHouse.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  houseImage: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize
})
