import { sequelize } from '../lib/db'
import { SortingHatUsers } from './sortingHatUsers'
import * as Sequelize from 'sequelize'

export class MemeHouses extends Sequelize.Model {
  public id!: number;
  public houseName!: string;
  public houseImage!: string;
}
MemeHouses.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  houseName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  houseImage: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'meme_houses'
})

MemeHouses.hasMany(SortingHatUsers)
