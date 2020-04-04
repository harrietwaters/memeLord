import 'jest'
import ping from './ping'
import * as Discord from 'discord.js'

interface MockMessage {
  content: string
  cleanContent: string
  channel: {
    send: jest.Mock
  }
}

function msgFactory (content: string): MockMessage {
  return {
    content,
    cleanContent: content,
    channel: {
      send: jest.fn()
    }
  }
}

describe('commands', () => {
  describe('ping', () => {
    it('is triggered is triggered when it should be', () => {
      const triggerMsg = msgFactory('!ping') as unknown as Discord.Message

      expect(ping.trigger(triggerMsg)).toBe(true)
    })

    it('is triggered is not triggered when it should not be', () => {
      const triggerMsg = msgFactory('!pong') as unknown as Discord.Message

      expect(ping.trigger(triggerMsg)).toBe(false)
    })

    it('executes', async () => {
      const triggerMsg = msgFactory('!ping') as unknown as Discord.Message

      await expect(ping.execute(triggerMsg)).resolves
      expect(triggerMsg.channel.send).toBeCalledTimes(1)
      expect(triggerMsg.channel.send).toBeCalledWith('boioioing')
    })
  })
})
