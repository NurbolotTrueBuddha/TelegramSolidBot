import TelegramBot from 'node-telegram-bot-api';
import Validate from '/validate.js'
const token = '5848173543:AAGOM47LkQ_znZ03Q0OBHdFjwITLbrEReO0';
const bot = new TelegramBot(token, { polling: true });
let validate = new Validate();

bot.on('message', (msg) => {
    validate.valiteMsg(msg, bot);
})
