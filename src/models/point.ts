import * as Sequelize from 'sequelize'
import { sequelize } from '../lib/db'
import { SortingHatUser } from './sortingHatUser'

export class Point extends Sequelize.Model {
  author!: string
  messageId!: string
  point!: number
  createdAt!: Date
}

Point.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  sortingHatUserId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  point: {
    type: Sequelize.INTEGER,
    defaultValue: () => Math.ceil(Math.random() * 1000),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  sequelize
})

Point.hasOne(SortingHatUser, {
  foreignKey: 'author',
  sourceKey: 'sortingHatUserId'
})
