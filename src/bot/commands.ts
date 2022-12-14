import { EmbedBuilder, Message } from 'discord.js';
import * as BotFunctions from './function';

/**
 * 渡されたコマンドから処理を実行する
 *
 * @param command 渡されたメッセージ
 */
export async function commandSelector(message: Message) {
    const content = message.content.replace('.', '').trimEnd().split(' ');
    const command = content[0];
    content.shift();
    switch (command) {
        case 'debug': {
            message.reply('デバッグコマンド');
            break;
        }
        case 'speak': {
            const channel = message.member?.voice.channel;
            const voiceType = Number(content[0]);
            let result;

            if (voiceType <= 0) {
                result = 0;
            } else {
                result = voiceType;
            }

            if (!channel) {
                const send = new EmbedBuilder()
                    .setColor('#ff0000')
                    .setTitle(`エラー`)
                    .setDescription(`userのボイスチャンネルが見つからなかった`);

                message.reply({ content: `ボイスチャンネルに入ってから使って～！`, embeds: [send] });
                return;
            }

            await BotFunctions.Speak.ready(channel, result);
            break;
        }
        case 'discon': {
            const channel = message.member?.voice.channel;
            if (!channel) {
                return;
            }

            await BotFunctions.Speak.disconnect(channel.guild.id);
        }
    }
}