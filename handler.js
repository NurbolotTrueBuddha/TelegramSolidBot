import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    sendStartMessage(msg) {
        let { from: { id } } = msg;
        this.bot.sendMessage(id, `Чтобы Solid bot начал работать нужно проинциализировать бота в группе админом. А участники должны залогиниться в боте!,
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

        this.bot.sendMessage(id, 'Solid bot инициализированв группе');
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
            this.bot.sendMessage(groupId, 'Поздраляем вы теперь инициолизированы в системе Solid Bot.', {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'Старт набор'
                        }],
                        [{
                            text: 'Список команд'
                        }]
                    ]
                }
            })

        }
        else {
            this.bot.sendMessage(id, 'Что бы начать работать залогинтесь в', {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'Login'
                        }]
                    ]
                }
            })

            this.bot.sendMessage(groupId, 'Вы не залогированы');
        }
    }


    async loginMessage(msg) {
        let { from: { id } } = msg;

        let userData = await fs.readFile('./user.json', { encoding: 'utf8' });
        let converted = JSON.parse(userData);

        let flag = false;

        for (let prop in converted) {
            if (converted[prop].id == id) {
                flag = true;
            }
        }

        if(flag) {
            this.bot.sendMessage(id, 'Вы уже зарегистрированы.');
        }
        else {
            this.bot.sendMessage(id, 'Напишите свой логин и парольв таком формате: user-ulan:pwd-ulan123');
        }
    }

    async checkLoginCreds() {

    }

}