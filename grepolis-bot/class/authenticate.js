'use strict';
const { remote  } = require('webdriverio');
const common = require('../common/common');

class Authenticate {

    get config(){ return { capabilities: { browserName: 'firefox' } }; }
    get uri(){ return 'https://br.grepolis.com/'; }
    get userField(){ return '#login_userid'}
    get passwordField(){ return '#login_password' }
    get submitButton(){ return '#login_Login'}
    get userValue(){ return 'ArturKing' }
    get passwordValue(){ return '06regis061994' }

    async browserInit(){
        global.browser = await remote(this.config);
    }

    async open(){ 
        await browser.url(this.uri);
    }

    async executeAuthenticate(){
        await common.click(this.userField);
        await common.setValue(this.userValue, this.userField);
        await common.setValue(this.passwordValue, this.passwordField);
        await common.click(this.submitButton);
        await common.loaded();
    }
}

module.exports = new Authenticate();