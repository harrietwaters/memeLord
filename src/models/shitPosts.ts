import { sequelize } from '../lib/db'
import * as Sequelize from 'sequelize'

export class ShitPosts extends Sequelize.Model {
  public id!: number;
  public user!: string;
  public messageContent!: string;
  public dateTime!: number;
  public imageHash!: string;
}
ShitPosts.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  user: {
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
  sequelize,
  modelName: 'shit_posts'
})
