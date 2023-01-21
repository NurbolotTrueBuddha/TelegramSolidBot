export default class Validate {
    handler;

    constructor(handler) {
        this.handler = handler;
    }

    async validateMsg(msg) {
        if(this.isInitBotCmd(msg)) this.handler.initBotMessage(msg);
        else if(this.isStartCmd(msg)) this.handler.sendStartMessage(msg);
        else if(this.isJoinMeCmd(msg)) await this.handler.joinMeMessage(msg);
        else if(this.isLoginCmd(msg)) await this.handler.loginMessage(msg)
        else if(this.isLoginValidateEvent(msg)) await this.handler.checkLoginCreds(msg)
        else if(this.isTeamListCmd(msg)) await this.handler.teamList(msg);
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
        if(text === 'Login') {
            return true;
        }
        else {
            return false;
        }
    }

    isLoginValidateEvent(msg) {
        let { text } = msg;

        if(text.includes('user-') && text.includes('pwd-')) {
            return true;
        }
        else {
            return false;
        }
    }

    isTeamListCmd(msg) {
        let { text } = msg;
        if(text === 'Список команд') {
            return true;
        }
        else {
            return false;
        }
    }
}