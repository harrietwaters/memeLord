import 'jest'
import help from './help'
import * as Discord from 'discord.js'

interface MockMessage {
  content: string
  cleanContent: string
  client: {
    commands: Array<{
      name: string
      description: string
      example: string
    }>
  }
  channel: {
    send: jest.Mock
  }
}

function msgFactory (content: string): MockMessage {
  return {
    content,
    cleanContent: content,
    client: {
      commands: [{
        name: 'foo',
        description: 'bazz buzz',
        example: 'foo [bar]'
      }]
    },
    channel: {
      send: jest.fn()
    }
  }
}

describe('commands', () => {
  describe('help', () => {
    it('is triggered is triggered when it should be', () => {
      const triggerMsg = msgFactory('!help') as unknown as Discord.Message

      expect(help.trigger(triggerMsg)).toBe(true)
    })

    it('is triggered is not triggered when it should not be', () => {
      const triggerMsg = msgFactory('!halp') as unknown as Discord.Message

      expect(help.trigger(triggerMsg)).toBe(false)
    })

    it('executes', async () => {
      const triggerMsg = msgFactory('!help') as unknown as Discord.Message

      await expect(help.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)
      expect(triggerMsg.channel.send).toBeCalledWith(`*foo*
    Description: bazz buzz
    Example: foo [bar]
`)
    })
  })
})
