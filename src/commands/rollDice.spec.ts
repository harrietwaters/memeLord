import 'jest'
import rollDice from './rollDice'
import * as Discord from 'discord.js'

interface MockMessage {
  content: string
  cleanContent: string
  channel: {
    send: jest.Mock
  }
}

function msgFactory (content: string): Discord.Message {
  const msg: MockMessage = {
    content,
    cleanContent: content,
    channel: {
      send: jest.fn()
    }
  }
  return msg as unknown as Discord.Message
}

describe('commands', () => {
  describe('rollDice', () => {
    it('is triggered is triggered when it should be', () => {
      const triggerMsg = msgFactory('!rollDice')

      expect(rollDice.trigger(triggerMsg)).toBe(true)
    })

    it('is triggered is not triggered when it should not be', () => {
      const triggerMsg = msgFactory('!rollBones')

      expect(rollDice.trigger(triggerMsg)).toBe(false)
    })

    it('executes', async () => {
      const triggerMsg = msgFactory('!rollDice 1 d20')

      await expect(rollDice.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)

      const res: string = (triggerMsg as unknown as MockMessage).channel.send.mock.calls[0][0]
      const num = +res.split(':')[1]

      expect(num).toBeGreaterThan(0)
      expect(num).toBeLessThan(21)
    })

    it('prints the help message side arg doesn\'t include "d"', async () => {
      const triggerMsg = msgFactory('!rollDice 1 1')

      await expect(rollDice.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)
      expect(triggerMsg.channel.send).toBeCalledWith('Invalid Command: !rollDice [number of die] [number faces]')
    })

    it('prints the help message if you supply 0s', async () => {
      const triggerMsg = msgFactory('!rollDice 0 d0')

      await expect(rollDice.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)
      expect(triggerMsg.channel.send).toBeCalledWith('Invalid Command: !rollDice [number of die] [number faces]')
    })

    it('prints the help message when you do it wrong', async () => {
      const triggerMsg = msgFactory('!rollDice durr i did the wrong args')

      await expect(rollDice.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)
      expect(triggerMsg.channel.send).toBeCalledWith('Invalid Command: !rollDice [number of die] [number faces]')
    })
  })
})
