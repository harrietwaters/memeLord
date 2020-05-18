import * as Discord from 'discord.js'

import getScores from './getScores'
import help from './help'
import listHouses from './listHouses'
import ping from './ping'
import putOnHat from './putOnHat'
import rollDice from './rollDice'

const commands: Discord.Command[] = [
  getScores,
  help,
  listHouses,
  ping,
  putOnHat,
  rollDice
]

export default commands
