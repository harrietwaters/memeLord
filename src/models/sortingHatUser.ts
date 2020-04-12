import * as Sequelize from 'sequelize'
import { sequelize } from '../lib/db'
import { MemeHouse } from './memeHouse'

export class SortingHatUser extends Sequelize.Model {
  author!: number
  lastHatTime!: number
  memeHouseId!: string
  createdAt!: Date
  updatedAt!: Date
}

SortingHatUser.init({
  author: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  lastHatTime: {
    type: Sequelize.INTEGER,
    defaultValue: () => Date.now(),
    allowNull: false
  },
  memeHouseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: MemeHouse,
      key: 'id'
    }
  }
}, {
  sequelize
})

MemeHouse.hasMany(SortingHatUser, {
  foreignKey: 'memeHouseId'
})
SortingHatUser.belongsTo(MemeHouse)
