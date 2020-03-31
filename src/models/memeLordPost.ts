import { sequelize } from '../lib/db'
import * as Sequelize from 'sequelize'

export class MemeLordPost extends Sequelize.Model {
  public id!: number;
  public command!: string;
  public triggerMessage!: string;
  public triggerResponse!: string;
  public dateTime!: number;
  public attachmentUrl!: string;
}

MemeLordPost.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  command: {
    type: Sequelize.STRING,
    allowNull: false
  },
  triggerMessage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  triggerResponse: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dateTime: {
    type: Sequelize.INTEGER,
    defaultValue: () => Date.now(),
    allowNull: false
  },
  attachmentUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  indexes: [
    {
      name: 'commandIndex',
      fields: ['command']
    },
    {
      name: 'dateTimeIndex',
      fields: ['dateTime']
    }
  ],
  sequelize
})
