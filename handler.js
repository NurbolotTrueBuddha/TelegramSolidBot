import * as fs from 'node:fs/promises';

export default class Handler {
    bot;

    constructor(bot) {
        this.bot = bot;
    }

    sendStartMessage(msg) {
        let { from: { id } } = msg;
        this.bot.sendMessage(id, 'Чтобы Solid bot начал работать нужно')
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
            if(converted[prop].id === id) {
                flag = true;
            }
        }
          
        if(flag) {
            this.bot.sendMessage(groupId, 'Поздровляем вы теперь инициализированы в системе Solid bot.')
        }
        else {
            this.bot.sendMessage(groupId, 'Чтобы начать пользоваться Solid bot нужно залогиниться в боте!')
        }
    }
}
















let ulan = {
    name: 'ulan',
    age: 21
}

let prop = 'name';

console.log(ulan.name);
console.log(ulan.age);

console.log(ulan[prop])
console.log(ulan['age'])




