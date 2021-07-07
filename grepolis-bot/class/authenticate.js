'use strict';

const { remote  } = require('webdriverio');

class Authenticate {

    get config(){ return { capabilities: { browserName: 'firefox' } }; }
    get uri(){ return 'https://br.grepolis.com/'; }

    async init(){
        global.browser = await remote(this.config);
    }

    async open(){ 
        await browser.url(this.uri);
    }
}

module.exports = Authenticate();