import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    sendStartMessage(msg) {
        let { from: { id } } = msg;
        this.bot.sendMessage(id, `Чтобы IK_entertaiment начал работать нужно проинциализировать бота в группе админом. А участники должны залогиниться в боте!,
        После нажать на кнопку здесь Логин`,{
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Логин'
                    }],
                ]
            }
        });
    }

    initBotMessage(msg) {
        let { chat: { id } } = msg;

        this.bot.sendMessage(id, 'IK_entertaiment инициализированв группе');
    }

    async joinMeMessage(msg) {
        let { from: { id }, chat: { id: groupId } } = msg;
        let userData = await fs.readFile('./user.json', { encoding: 'utf8' });
        let converted = JSON.parse(userData);

        let flag = false;

        for (let prop in converted) {
            if (converted[prop].id == id) {
                flag = true;
            }
        }

        if (flag) {
            this.bot.sendMessage(groupId, 'Чтобы ознакомится с системой нажмите на кнопку Список команд', {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'Список команд'
                        }],
                        [{
                            text: 'Помощь'
                        }]
                    ]
                }
            });
            await this.bot.on('message', (msg) => {
                let { chat: { id: groupId }, text } = msg;
                if (text === 'Список команд') {
                    this.bot.sendMessage(groupId, `List of inited member
Если кто еще не добавлен в список. То ему нужно обязательно:
1) Залогиниться в @testblablablabla_bot
2) Добавить себя в группу через команду /joinme
                    `)
                }
            })

        }
        else {
            this.bot.sendMessage(groupId, 'Чтобы начать пользоваться IK_entertaiment нужно залогиниться в боте! @testblablablabla_bot')
            console.log(msg)
        }
    }
    async loginMessage(msg) {
        this.bot.sendMessage(msg.from.id, `Напишите свой логин и пароль
        в таком формате.
        user-ulan:pwd-ulan123`)
        this.bot.on('message', async (msg) => {
            let { from: { id }, text } = msg;
            let userData = await fs.readFile('./user.json', { encoding: 'utf8' });
            let converted = await JSON.parse(userData);
            let flag = false
            for (let prop in converted) {
                if (converted[prop].username_password == text) {
                    converted[prop].id = String(id)
                    flag = true
                }
            }
            converted =  JSON.stringify(converted, null, 2)
            await fs.writeFile('./user.json', converted);
            if (flag) {
                await this.bot.sendMessage(id, `Поздравляю вы вошли в систему.
                Можете начать работать с IK_ENTERTAIMENT!`, {
                    reply_markup: {
                        keyboard: [
                            [{
                                text: 'Мои инструкции'
                            }],
                            [{
                                text: 'Что такое Scrum'
                            }],
                            [{
                                text: 'Наша философия'
                            }],
                            [{
                                text: 'Моя должность'
                            }]
                        ]
                    }
                });
            }
            

        })
    }
}