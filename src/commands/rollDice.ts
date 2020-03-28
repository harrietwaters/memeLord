import * as Discord from 'discord.js'

const COMMAND = '!rollDice'

const rollDice: Discord.Command = {
  name: 'Roll Dice',
  description: 'Rolls dice',
  trigger: (message: Discord.Message): boolean => {
    const lowerMsg = message.content.toLowerCase()
    return lowerMsg.startsWith(COMMAND.toLowerCase())
  },
  execute: async (message: Discord.Message, args): Promise<Discord.Message> => {
    const lowerMsg: string = message.content.toLowerCase()
    const diceArgs: string[] = lowerMsg.split(/ +/).slice(1)

    let isValid: boolean = true
    let numberOfDie: number = 0
    let numberOfDieFaces: number = 0

    if (diceArgs.length !== 2) isValid = false
    if (!diceArgs[1].startsWith('d')) isValid = false

    try {
      numberOfDie = parseInt(diceArgs[0])
      numberOfDieFaces = parseInt(diceArgs[1].slice(1))
    } catch (err) {
      isValid = false
    }

    if (!isValid || numberOfDie === 0 || numberOfDieFaces === 0) {
      return message.channel.send('Invalid Command\n' + helpMsg())
    }

    const results: number[] = []

    for (let i = 0; i < numberOfDie; i++) {
      results.push(Math.floor(Math.random() * numberOfDieFaces) + 1)
    }

    return message.channel.send(`Your results: ${results.join(', ')}`)
  }
}

function helpMsg (): string {
  return `
  !rollDice [number of die] [number faces]
  example: "!rollDice 4 d12"
  `
}

module.exports = rollDice
