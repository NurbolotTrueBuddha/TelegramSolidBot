export default class Validate {
    handler;

    constructor(handler) {
        this.handler = handler;
    }

    async validateMsg(msg) {
        if(this.isInitBotCmd(msg)) this.handler.initBotMessage(msg);
        else if(this.isStartCmd(msg)) this.handler.sendStartMessage(msg);
        else if(this.isJoinMeCmd(msg)) await this.handler.joinMeMessage(msg);
        else if(this.isLoginCmd(msg)) console.log('isLoginCmd')
        else console.log('not correct command')
    }

    isInitBotCmd(msg) {
        let { text } = msg;
        if(text === '/initbot') {
            return true;
        }
        else {
            return false;
        }
    }

    isStartCmd(msg) {
        let { text } = msg;
        if(text === '/start') {
            return true;
        }
        else {
            return false;
        }
    }

    isJoinMeCmd(msg) {
        let { text } = msg;
        if(text === '/joinme') {
            return true;
        }
        else {
            return false;
        }
    }

    isLoginCmd(msg) {
        let { text } = msg;
        if(text === 'Логин') {
            return true;
        }
        else {
            return false;
        }
    }
}