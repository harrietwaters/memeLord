import { sequelize } from '../lib/db'
import { MemeHouses } from './memeHouses'
import * as Sequelize from 'sequelize'

export class SortingHatUsers extends Sequelize.Model {
  public id!: number;
  public userId!: string;
  public houseId!: string;
  public lastHatTime!: number;
}
SortingHatUsers.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastHatTime: {
    type: Sequelize.INTEGER,
    defaultValue: () => Date.now(),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'sorting_hat_users'
})

SortingHatUsers.hasOne(MemeHouses)
