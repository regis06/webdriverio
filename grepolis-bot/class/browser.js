const { remote  } = require('webdriverio');

class Authenticate {
    get uri(){ return 'https://br.grepolis.com/'; }
    get config(){
        return { capabilities: { browserName: 'firefox' } };
    }

    async init( ){
        global.browser = await remote(this.config);
    }

    async open( ) { 
        await browser.url( this.uri );
    }
}

module.exports = Authenticate();