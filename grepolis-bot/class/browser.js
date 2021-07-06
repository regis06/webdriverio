const { remote  } = require('webdriverio');

class Browser {
    constructor( uri ) {
        this.uri = uri;
    }

    async init( ){
        this.browser = await remote({
            capabilities: {
                browserName: 'firefox'
            }
        });
    }

    async open( ) {
        await this.init(); 
        await this.browser.url( this.uri );
        return this.browser;
    }
}

module.exports = Browser;