const { remote  } = require('webdriverio');

class Authenticate {
    get uri(){ return 'https://br.grepolis.com/'; }
    get config(){ return { capabilities: { browserName: 'firefox' } }; }
    get data(){
        return {
            login: 'ArturKing', 
            password: '06regis061994',
            loginSelector: '#login_userid',
            passwordSelector: '#login_password',
            submit: '#login_Login'
        }
    }

    async init(){
        global.browser = await remote(this.config);
    }

    async open() { 
        await browser.url(this.uri);
    }

    async executeAuthenticate() {
        
        /* await super.open( );
    
        await super.click( userSelector );

        await super.setValue( login );

        await super.setValue( password, passwordSelector );

        await super.click( submit );

        await super.loaded( ); */
    }
}

module.exports = Authenticate;