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
        
    }
}