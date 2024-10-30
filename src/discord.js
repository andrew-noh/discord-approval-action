import { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

class DiscordApproval {
  constructor(token, channelId) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ]
    });
    this.channelId = channelId;
    this.token = token;
  }

  async initialize() {
    await this.client.login(this.token);
  }

  async requestApproval(title, description, timeout) {
    const channel = await this.client.channels.fetch(this.channelId);
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('approve')
          .setLabel('✅ 승인')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('deny')
          .setLabel('❌ 거절')
          .setStyle(ButtonStyle.Danger)
      );

    const message = await channel.send({
      embeds: [{
        title,
        description,
        color: 0xFFA500,
        timestamp: new Date()
      }],
      components: [row]
    });

    try {
      const interaction = await message.awaitMessageComponent({
        filter: i => ['approve', 'deny'].includes(i.customId),
        time: timeout * 1000
      });

      await interaction.update({
        embeds: [{
          title,
          description: `${description}\n\n${
            interaction.customId === 'approve' 
              ? '✅ 승인' 
              : '❌ 거절'
          } by ${interaction.user.tag}`,
          color: interaction.customId === 'approve' ? 0x00FF00 : 0xFF0000,
          timestamp: new Date()
        }],
        components: []
      });

      return interaction.customId === 'approve';
    } catch (error) {
      await message.edit({
        embeds: [{
          title,
          description: `${description}\n\n⏰ 요청 시간 초과`,
          color: 0xFF0000,
          timestamp: new Date()
        }],
        components: []
      });
      return false;
    } finally {
      await this.client.destroy();
    }
  }
}

export default DiscordApproval;