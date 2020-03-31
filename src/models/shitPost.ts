import { sequelize } from '../lib/db'
import * as Sequelize from 'sequelize'

export class ShitPost extends Sequelize.Model {
  public id!: number;
  public user!: string;
  public messageContent!: string;
  public dateTime!: number;
  public imageHash!: string;
}
ShitPost.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  messageContent: {
    type: Sequelize.STRING
  },
  dateTime: {
    type: Sequelize.INTEGER,
    defaultValue: () => Date.now(),
    allowNull: false
  },
  imageHash: {
    type: Sequelize.STRING
  }
}, {
  indexes: [
    {
      name: 'image_hash_index',
      fields: ['imageHash']
    }
  ],
  sequelize
})
